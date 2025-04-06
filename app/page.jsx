import CryptoCard from "@/components/CryptoCard";
import WeatherCard from "@/components/WeatherCard";
import NewsSection from "@/components/NewsSection";
import FavoritesSection from "./components/FavouritesSection";

// Mock data with more items for scrolling
const cryptoData = [
  { id: "bitcoin", name: "Bitcoin", symbol: "btc", current_price: 83427.20, price_change_percentage_24h: 0.00 },
  { id: "ethereum", name: "Ethereum", symbol: "eth", current_price: 1808.89, price_change_percentage_24h: 0.15 },
  { id: "cardano", name: "Cardano", symbol: "ada", current_price: 0.647, price_change_percentage_24h: -1.68 },
  { id: "solana", name: "Solana", symbol: "sol", current_price: 102.45, price_change_percentage_24h: 2.34 },
  { id: "ripple", name: "Ripple", symbol: "xrp", current_price: 0.52, price_change_percentage_24h: -0.75 },
  { id: "polkadot", name: "Polkadot", symbol: "dot", current_price: 6.78, price_change_percentage_24h: 1.23 },
  { id: "dogecoin", name: "Dogecoin", symbol: "doge", current_price: 0.15, price_change_percentage_24h: 5.67 },
  { id: "avalanche", name: "Avalanche", symbol: "avax", current_price: 34.56, price_change_percentage_24h: -2.12 }
];

const weatherData = [
  { id: "new-york", name: "New York", temp: "11°C", condition: "Rain", humidity: "87%" },
  { id: "london", name: "London", temp: "5°C", condition: "Clouds", humidity: "85%" },
  { id: "tokyo", name: "Tokyo", temp: "15°C", condition: "Clouds", humidity: "75%" },
  { id: "paris", name: "Paris", temp: "8°C", condition: "Clear", humidity: "70%" },
  { id: "dubai", name: "Dubai", temp: "32°C", condition: "Sunny", humidity: "45%" },
  { id: "sydney", name: "Sydney", temp: "18°C", condition: "Partly Cloudy", humidity: "65%" },
  { id: "toronto", name: "Toronto", temp: "3°C", condition: "Snow", humidity: "90%" },
  { id: "singapore", name: "Singapore", temp: "28°C", condition: "Thunderstorm", humidity: "80%" }
];


export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">CryptoWeather Nexus</h1>
        <p className="text-indigo-300 mt-2 text-sm">Your unified dashboard for crypto & weather updates</p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <CryptoCard coins={cryptoData} />
          <WeatherCard cities={weatherData} />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <FavoritesSection cryptoData={cryptoData} weatherData={weatherData} />
          <NewsSection />
        </div>
      </main>
      
      <footer className="text-center mt-10 text-sm text-indigo-400">
        © 2025 CryptoWeather Nexus. All rights reserved.
      </footer>
    </div>
  );
}