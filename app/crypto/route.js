import { NextResponse } from 'next/server';

export const revalidate = 600; // Revalidate every 10 minutes
export const dynamic = 'force-static';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY; 
    
    
    const listingsResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/list`,
      {
        headers: {
          'x-cg-demo-api-key': apiKey
        }
      }
    );

    if (!listingsResponse.ok) {
      throw new Error('Failed to fetch cryptocurrency listings');
    }

    const allCoins = await listingsResponse.json();

    
    const marketsResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
      {
        headers: {
          'x-cg-demo-api-key': apiKey
        },
        next: { revalidate: 600 }
      }
    );

    if (!marketsResponse.ok) {
      const errorData = await marketsResponse.json();
      throw new Error(errorData?.error || 'Failed to fetch crypto market data');
    }

    const marketData = await marketsResponse.json();

    // Transform to match our frontend needs
    const formattedData = marketData.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      image: coin.image,
      sparkline: coin.sparkline_in_7d?.price
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
        retryAfter: 60
      },
      { status: 500 }
    );
  }
}