"use client";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/outline";

import { useSelector, useDispatch } from "react-redux";
import { toggleWeatherFavorite } from "@/store/favoritesSlice";

export default function WeatherCard({ cities }) {
  const dispatch = useDispatch();
  const weatherFavorites = useSelector((state) => state.favorites.weather);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 h-[400px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-900 py-2">
        🌤️ Weather Updates
      </h2>

      <div className="space-y-4">
        {cities.map((city) => (
          <div
            key={city.id}
            className="group relative hover:bg-gray-800 p-4 rounded-lg transition-colors border-b border-gray-700 last:border-0"
          >
            <Link href={`/weather/${city.id}`} className="block">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{city.name}</h3>
                  <p className="text-2xl font-bold text-white my-1">
                    {city.temp}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{city.condition}</p>
                  <p className="text-gray-500 text-sm">
                    Humidity: {city.humidity}
                  </p>
                </div>
              </div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleWeatherFavorite(city.id));
              }}
              className="absolute top-4 right-4 p-1"
            >
              
              <StarIcon
                className={`h-6 w-6 ${
                  weatherFavorites.includes(city.id)
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
