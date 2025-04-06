import WeatherCard from "./components/WeatherCard";
import CryptoCard from "./components/CryptoCard";
import NewsSection from "./components/NewsSection";


export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">CryptoWeather Nexus</h1>
        <p className="text-indigo-300 mt-2 text-sm">Your unified dashboard for crypto & weather updates</p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CryptoCard />
          <WeatherCard />
        </div>
        
        {/* Right Column - News */}
        <div className="lg:col-span-2">
          <NewsSection />
        </div>
      </main>
      
      <footer className="text-center mt-10 text-sm text-indigo-400">
        © 2025 CryptoWeather Nexus. All rights reserved.
      </footer>
    </div>
  );
}