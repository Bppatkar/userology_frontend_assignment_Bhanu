import { NextResponse } from 'next/server';

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = 'force-static';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
      {
        headers: {
          'x-cg-demo-api-key': apiKey // Better to use headers than query params for API keys
        },
        next: { revalidate: 600 } // ISR caching
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || 'Failed to fetch crypto data');
    }

    const data = await response.json();
    
    // Transform to match our frontend needs
    const formattedData = data.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price // Added sparkline data if available
    }));

    return NextResponse.json(formattedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('Crypto API Error:', error.message);
    return NextResponse.json(
      { 
        error: error.message,
        retryAfter: 60 // Suggested retry time in seconds
      },
      { status: 500 }
    );
  }
}