import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { coinId } = params;
    const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
    
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false&x_cg_demo_api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${coinId}`);
    }

    const data = await response.json();
    
    // Transform to match our frontend needs
    const formattedData = {
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      current_price: data.market_data.current_price.usd,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      market_cap: data.market_data.market_cap.usd,
      image: data.image.large,
      description: data.description.en,
      price_change_percentage_7d: data.market_data.price_change_percentage_7d_in_currency.usd,
      price_change_percentage_30d: data.market_data.price_change_percentage_30d_in_currency.usd,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}