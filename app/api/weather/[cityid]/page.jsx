"use client";
import { useRouter } from 'next/navigation';
import { StarIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from 'react-redux';
import { toggleWeatherFavorite } from '@/store/favoritesSlice';

export default function WeatherDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const weatherFavorites = useSelector((state) => state.favorites.weather);
  const isFavorite = weatherFavorites.includes(params.cityId);

  // Mock data - replace with API call
  const weatherData = {
    id: params.cityId,
    name: "New York",
    temp: "11°C",
    condition: "Rain",
    humidity: "87%",
    wind: "15 km/h",
    forecast: [
      { day: "Mon", temp: "12°C", condition: "Clouds" },
      { day: "Tue", temp: "10°C", condition: "Rain" },
      { day: "Wed", temp: "8°C", condition: "Clear" },
      { day: "Thu", temp: "9°C", condition: "Clouds" },
      { day: "Fri", temp: "11°C", condition: "Rain" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-6">
          <button 
            onClick={() => router.back()}
            className="text-blue-400 hover:underline flex items-center"
          >
            ← Back to Dashboard
          </button>
          <button 
            onClick={() => dispatch(toggleWeatherFavorite(params.cityId))}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
           
            <StarIcon className={`h-6 w-6 ${isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />

          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">{weatherData.name} Weather</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
            <div className="flex items-center gap-4">
              <span className="text-5xl">🌧️</span>
              <div>
                <p className="text-4xl font-bold">{weatherData.temp}</p>
                <p className="text-gray-400">{weatherData.condition}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p>Humidity: {weatherData.humidity}</p>
              <p>Wind: {weatherData.wind}</p>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">5-Day Forecast</h2>
            <div className="space-y-3">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="w-16">{day.day}</span>
                  <span className="text-gray-400">{day.condition}</span>
                  <span className="font-medium">{day.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Temperature History</h2>
          <div className="h-48 bg-gray-600 rounded flex items-center justify-center">
            Interactive chart would go here
          </div>
        </div>
      </div>
    </div>
  );
}