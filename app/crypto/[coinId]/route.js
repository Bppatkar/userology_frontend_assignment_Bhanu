import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { coinId } = params;
    const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;


    // Validate coin ID
    if (!coinId || typeof coinId !== 'string') {
      return NextResponse.json(
        { 
          error: "Invalid coin ID format",
          validFormats: "Lowercase coin IDs (e.g., 'bitcoin', 'ethereum')",
          received: coinId
        },
        { status: 400 }
      );
    }

    // Clean and validate the coin ID
    const cleanCoinId = coinId.toLowerCase().trim();
    
    
    

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cleanCoinId}`,
      {
        headers: {
          'x-cg-demo-api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { 
          error: error.error || "Failed to fetch coin data",
          status: response.status 
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
      image: data.image.large,
      description: data.description.en,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}