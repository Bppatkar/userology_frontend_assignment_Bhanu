"use client";
import { HeartIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';

export default function FavoritesSection({ cryptoData, weatherData }) {
  const { crypto: cryptoFavorites, weather: weatherFavorites } = useSelector((state) => state.favorites);

  const favoriteCryptos = cryptoData.filter(coin => cryptoFavorites.includes(coin.id));
  const favoriteCities = weatherData.filter(city => weatherFavorites.includes(city.id));

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">⭐ Favorites</h2>
      
      {cryptoFavorites.length === 0 && weatherFavorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet. Click the ♡ icon to add some!</p>
      ) : (
        <div className="space-y-6">
          {favoriteCryptos.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Cryptocurrencies</h3>
              <div className="space-y-3">
                {favoriteCryptos.map(coin => (
                  <div key={coin.id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-green-400">${coin.current_price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {favoriteCities.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">Cities</h3>
              <div className="space-y-3">
                {favoriteCities.map(city => (
                  <div key={city.id} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                    <span className="font-medium">{city.name}</span>
                    <span className="text-blue-400">{city.temp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}