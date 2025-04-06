import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { cityid } = params;
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    // First try to get city from our predefined list
    const predefinedCities = [
      { id: "new-york", name: "New York", lat: 40.7128, lon: -74.006 },
      {
        id: "london",
        name: "London",
        lat: 51.5074,
        lon: -0.1278,
      },
      {
        id: "tokyo",
        name: "Tokyo",
        lat: 35.6762,
        lon: 139.6503,
      },
      { id: "paris", name: "Paris", lat: 48.8566, lon: 2.3522 },
      { id: "berlin", name: "Berlin", lat: 52.52, lon: 13.405 },
      {
        id: "sydney",
        name: "Sydney",
        lat: -33.8688,
        lon: 151.2093,
      },
      { id: "dubai", name: "Dubai", lat: 25.2048, lon: 55.2708 },
      {
        id: "singapore",
        name: "Singapore",
        lat: 1.3521,
        lon: 103.8198,
      },
      {
        id: "hong-kong",
        name: "Hong Kong",
        lat: 22.3193,
        lon: 114.1694,
      },
      {
        id: "toronto",
        name: "Toronto",
        lat: 43.6532,
        lon: -79.3832,
      },
    ];

    let cityInfo = predefinedCities.find((c) => c.id === cityid.toLowerCase());

    // If not found in predefined list, try geocoding API to find coordinates
    if (!cityInfo) {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityid}&limit=1&appid=${apiKey}`
      );

      if (!geoResponse.ok) {
        throw new Error("Failed to lookup city coordinates");
      }

      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        return NextResponse.json(
          { error: "City not found", received: cityid },
          { status: 404 }
        );
      }

      cityInfo = {
        id: cityid.toLowerCase(),
        name: geoData[0].name,
        lat: geoData[0].lat,
        lon: geoData[0].lon,
      };
    }

    // Fetch weather data
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityInfo.lat}&lon=${cityInfo.lon}&appid=${apiKey}&units=metric`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.lat}&lon=${cityInfo.lon}&appid=${apiKey}&units=metric`
      ),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather API request failed");
    }

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json(),
    ]);

    // Format response
    return NextResponse.json({
      id: cityInfo.id,
      name: currentData.name || cityInfo.name,
      current: {
        temp: Math.round(currentData.main.temp),
        feels_like: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        pressure: currentData.main.pressure,
        icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
      },
      forecast: forecastData.list
        .filter((_, index) => index % 8 === 0) // Daily forecast
        .map((item) => ({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        })),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
