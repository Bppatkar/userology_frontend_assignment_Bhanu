import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const cities = [
      { id: 'new-york', name: 'New York', lat: 40.7128, lon: -74.0060 },
      { id: 'london', name: 'London', lat: 51.5074, lon: -0.1278 },
      { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lon: 139.6503 }
    ];

    const weatherData = await Promise.all(
      cities.map(async city => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        return {
          id: city.id,
          name: city.name,
          temp: `${Math.round(data.main.temp)}°C`,
          condition: data.weather[0].main,
          humidity: `${data.main.humidity}%`,
          icon: data.weather[0].icon
        };
      })
    );

    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}