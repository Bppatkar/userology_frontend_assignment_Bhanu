"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { toggleCryptoFavorite } from "@/store/favoritesSlice";

export default function CryptoDetail({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cryptoFavorites = useSelector((state) => state.favorites.crypto);
  const isFavorite = cryptoFavorites.includes(params.coinId);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/crypto/${params.coinId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch coin data");
        }

        const data = await response.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [params.coinId]);

  if (loading)
    return <div className="p-6 text-center">Loading coin data...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!coin) return <div className="p-6">Coin not found</div>;

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
            onClick={() => dispatch(toggleCryptoFavorite(params.coinId))}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <StarIcon
              className={`h-6 w-6 ${
                isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
        </div>

        <div className="flex items-start gap-6 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg min-w-[80px]">
            <img src={coin.image} alt={coin.name} className="w-16 h-16" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {coin.name} ({coin.symbol.toUpperCase()})
            </h1>
            <p className="text-gray-400 mt-2">{coin.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Data</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Current Price</span>
                <span className="text-2xl font-bold">
                  ${coin.current_price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Change</span>
                <span
                  className={`text-lg ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">7d Change</span>
                <span
                  className={`text-lg ${
                    coin.price_change_percentage_7d >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_7d.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Market Cap</span>
                <span>${(coin.market_cap / 1000000000).toFixed(2)}B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">24h Volume</span>
                <span>${(coin.total_volume / 1000000000).toFixed(2)}B</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
            <div className="h-64 bg-gray-600 rounded flex items-center justify-center text-gray-400">
              Price chart for {coin.name} would display here
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Market Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">All-Time High</p>
              <p className="text-lg font-bold">$68,789.63</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Circulating Supply</p>
              <p className="text-lg font-bold">19.5M BTC</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Supply</p>
              <p className="text-lg font-bold">21M BTC</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Market Dominance</p>
              <p className="text-lg font-bold">42.8%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
