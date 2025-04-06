import { NextResponse } from 'next/server';

export const revalidate = 300; // Revalidate every 5 minutes

export async function GET(request, { params }) {
  try {
    const { coinid } = params;
    const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

    // Improved coin ID validation
    if (!coinid || typeof coinid !== 'string') {
      return NextResponse.json(
        { 
          error: "Coin ID must be a string",
          example: "/api/crypto/bitcoin",
          validIds: ["bitcoin", "ethereum", "cardano"]
        },
        { status: 400 }
      );
    }

    // Clean the coin ID (remove special characters, trim whitespace)
    const cleanCoinId = coinid
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '');

    if (!cleanCoinId) {
      return NextResponse.json(
        { 
          error: "Invalid coin ID characters",
          received: coinid,
          cleaned: cleanCoinId
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cleanCoinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      {
        headers: {
          'x-cg-demo-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      // More specific error messages based on status code
      if (response.status === 404) {
        return NextResponse.json(
          { 
            error: "Coin not found",
            coinId: cleanCoinId,
            suggestion: "Check the coin ID at https://www.coingecko.com"
          },
          { status: 404 }
        );
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Transform response data
    const formattedData = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      current_price: data.market_data?.current_price?.usd || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
      image: data.image?.large || '/crypto-placeholder.png',
      description: data.description?.en || 'No description available',
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error(`Crypto detail error for ${params.coinid}:`, error);
    return NextResponse.json(
      { 
        error: error.message,
        coinId: params.coinid,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}