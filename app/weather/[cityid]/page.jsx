"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWeatherFavorite } from '@/store/favoritesSlice';

export default function WeatherDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const weatherFavorites = useSelector((state) => state.favorites.weather);
  const isFavorite = weatherFavorites.includes(params.cityId);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/weather/${params.cityId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [params.cityId]);

  if (loading) return <div className="p-6 text-center">Loading weather data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!weather) return <div className="p-6">Weather data not available</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={() => router.back()}
            className="text-blue-400 hover:underline flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
          <button 
            onClick={() => dispatch(toggleWeatherFavorite(params.cityId))}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <StarIcon className={`h-6 w-6 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">{city.name} Weather</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <div className="flex items-center gap-6">
              <span className="text-6xl">{city.forecast[0].icon}</span>
              <div>
                <p className="text-5xl font-bold">{city.current_temp}</p>
                <p className="text-gray-400">Feels like {city.feels_like}</p>
                <p className="text-xl mt-2">{city.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-400">Humidity</p>
                <p className="text-lg">{city.humidity}</p>
              </div>
              <div>
                <p className="text-gray-400">Wind</p>
                <p className="text-lg">{city.wind}</p>
              </div>
              <div>
                <p className="text-gray-400">Pressure</p>
                <p className="text-lg">{city.pressure}</p>
              </div>
              <div>
                <p className="text-gray-400">Visibility</p>
                <p className="text-lg">{city.visibility}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
            <div className="space-y-4">
              {city.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="w-20 font-medium">{day.day}</span>
                  <span className="text-2xl">{day.icon}</span>
                  <span className="text-gray-400 w-24 text-right">{day.condition}</span>
                  <div className="flex gap-2 w-24 justify-end">
                    <span className="font-medium">{day.high}</span>
                    <span className="text-gray-400">{day.low}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Temperature History</h2>
          <div className="h-64 bg-gray-600 rounded flex items-center justify-center text-gray-400">
            Temperature chart for {city.name} would display here
          </div>
        </div>
      </div>
    </div>
  );
}