"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "@/store/weatherSlice";
import Skeleton from "./Skeleton";

export default function WeatherCard() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.weather);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    dispatch(fetchWeather());
  }, [dispatch]);

  // Server-side fallback
  if (!isMounted) {
    return <Skeleton type="weather" />;
  }

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error fetching weather data</p>;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
    <h2 className="text-xl font-semibold mb-2">🌤️ Weather - {data?.name}</h2>
    <p className="text-gray-300">Temperature: {(data?.main?.temp - 273.15).toFixed(2)}°C</p>
    <p className="text-gray-400">Humidity: {data?.main?.humidity}%</p>
  </div>
  );
}
