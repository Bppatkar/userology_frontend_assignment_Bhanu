"use client";
import { useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { toggleCryptoFavorite } from "@/store/favoritesSlice";

export default function CryptoDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cryptoFavorites = useSelector((state) => state.favorites.crypto);
  const isFavorite = cryptoFavorites.includes(params.coinId);

  // Mock data - replace with API call
  const cryptoData = {
    id: params.coinId,
    name: "Bitcoin",
    symbol: "BTC",
    current_price: 83427.2,
    price_change_percentage_24h: 0.0,
    market_cap: 1600000000000,
    image: "/bitcoin.png",
    description: "Bitcoin is a decentralized digital currency...",
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
            onClick={() => dispatch(toggleCryptoFavorite(params.coinId))}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <StarIcon
              className={`h-6 w-6 ${
                isFavorite ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="flex items-start gap-6 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg">
            <img
              src={cryptoData.image}
              alt={cryptoData.name}
              className="w-20 h-20"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {cryptoData.name} ({cryptoData.symbol})
            </h1>
            <p className="text-gray-400 mt-2">{cryptoData.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Data</h2>
            <div className="space-y-3">
              <p className="flex justify-between">
                <span className="text-gray-400">Current Price:</span>
                <span className="text-2xl font-bold">
                  ${cryptoData.current_price.toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">24h Change:</span>
                <span
                  className={`${
                    cryptoData.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {cryptoData.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Market Cap:</span>
                <span>${(cryptoData.market_cap / 1000000000).toFixed(2)}B</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
            <div className="h-48 bg-gray-600 rounded flex items-center justify-center">
              Interactive chart would go here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
