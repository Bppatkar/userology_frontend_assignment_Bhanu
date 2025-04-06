import WeatherCard from "./components/WeatherCard";
import CryptoCard from "./components/CryptoCard";

export default function Dashboard() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <WeatherCard />
      <CryptoCard />
    </div>
  );
}
