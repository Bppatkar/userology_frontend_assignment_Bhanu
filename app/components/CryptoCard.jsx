"use client";
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCryptoFavorite } from '@/store/favoritesSlice';

export default function CryptoCard({ coins }) {
  const dispatch = useDispatch();
  const cryptoFavorites = useSelector((state) => state.favorites.crypto);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 h-[400px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-900 py-2 z-10">💰 Crypto Prices</h2>
      
      <div className="space-y-3">
        {coins.map((coin) => (
          <div key={coin.id} className="group relative hover:bg-gray-800 p-3 rounded-lg transition-colors border border-gray-700">
            <Link href={`/crypto/${coin.id}`} className="block pr-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-medium">{coin.name}</h3>
                  <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${coin.current_price.toLocaleString()}</p>
                  <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                dispatch(toggleCryptoFavorite(coin.id));
              }}
              className="absolute top-3 right-3 p-1"
            >
              <StarIcon 
                className={`h-5 w-5 ${cryptoFavorites.includes(coin.id) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}