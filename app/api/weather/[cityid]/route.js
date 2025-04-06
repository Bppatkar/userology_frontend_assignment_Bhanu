import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { cityId } = params;
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    // City coordinates mapping
    const cityCoordinates = {
      'new-york': { lat: 40.7128, lon: -74.0060 },
      'london': { lat: 51.5074, lon: -0.1278 },
      'tokyo': { lat: 35.6762, lon: 139.6503 }
    };

    const coords = cityCoordinates[cityId];
    if (!coords) {
      throw new Error('City not found');
    }

    // Fetch current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
    );
    const currentData = await currentResponse.json();

    // Fetch forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    // Transform data
    const formattedData = {
      id: cityId,
      name: currentData.name,
      current: {
        temp: `${Math.round(currentData.main.temp)}°C`,
        feels_like: `${Math.round(currentData.main.feels_like)}°C`,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: `${currentData.main.humidity}%`,
        wind: `${currentData.wind.speed} m/s`,
        pressure: `${currentData.main.pressure} hPa`,
        icon: currentData.weather[0].icon
      },
      forecast: forecastData.list
        .filter((_, index) => index % 8 === 0) // Daily forecast
        .map(item => ({
          date: item.dt_txt,
          temp: `${Math.round(item.main.temp)}°C`,
          condition: item.weather[0].main,
          icon: item.weather[0].icon
        }))
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}