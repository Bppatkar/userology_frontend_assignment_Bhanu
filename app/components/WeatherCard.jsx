"use client";
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWeatherFavorite } from '@/store/favoritesSlice';

export default function WeatherCard({ cities }) {
  const dispatch = useDispatch();
  const weatherFavorites = useSelector((state) => state.favorites.weather);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 h-[400px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-900 py-2 z-10">🌤️ Weather Updates</h2>
      
      <div className="space-y-3">
        {cities.map((city) => (
          <div key={city.id} className="group relative hover:bg-gray-800 p-3 rounded-lg transition-colors border border-gray-700">
            <Link href={`/weather/${city.id}`} className="block pr-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{city.name}</h3>
                  <p className="text-2xl font-bold text-white my-1">{city.temp}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{city.condition}</p>
                  <p className="text-gray-500 text-sm">Humidity: {city.humidity}</p>
                </div>
              </div>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleWeatherFavorite(city.id));
              }}
              className="absolute top-3 right-3 p-1"
            >
              <StarIcon 
                className={`h-5 w-5 ${weatherFavorites.includes(city.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}