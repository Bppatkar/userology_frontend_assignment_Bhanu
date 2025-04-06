import { NextResponse } from 'next/server';

// List of major world cities with their coordinates
const MAJOR_CITIES = [
  { id: 'new-york', name: 'New York', lat: 40.7128, lon: -74.0060, country: 'US' },
  { id: 'london', name: 'London', lat: 51.5074, lon: -0.1278, country: 'GB' },
  { id: 'tokyo', name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'JP' },
  { id: 'paris', name: 'Paris', lat: 48.8566, lon: 2.3522, country: 'FR' },
  { id: 'berlin', name: 'Berlin', lat: 52.5200, lon: 13.4050, country: 'DE' },
  { id: 'sydney', name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'AU' },
  { id: 'dubai', name: 'Dubai', lat: 25.2048, lon: 55.2708, country: 'AE' },
  { id: 'singapore', name: 'Singapore', lat: 1.3521, lon: 103.8198, country: 'SG' },
  { id: 'hong-kong', name: 'Hong Kong', lat: 22.3193, lon: 114.1694, country: 'HK' },
  { id: 'toronto', name: 'Toronto', lat: 43.6532, lon: -79.3832, country: 'CA' }
];

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    
    const weatherData = await Promise.all(
      MAJOR_CITIES.map(async city => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`
          );
          
          if (!response.ok) {
            console.error(`Failed to fetch weather for ${city.name}`);
            return {
              ...city,
              temp: 'N/A',
              condition: 'Unknown',
              humidity: 'N/A',
              icon: '❓'
            };
          }

          const data = await response.json();
          return {
            id: city.id,
            name: city.name,
            country: city.country,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          };
        } catch (error) {
          console.error(`Error fetching weather for ${city.name}:`, error);
          return {
            ...city,
            temp: 'N/A',
            condition: 'Error',
            humidity: 'N/A',
            icon: '❌'
          };
        }
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