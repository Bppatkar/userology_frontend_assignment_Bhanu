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
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p>Temperature: {data.main?.temp}°C</p>
      <p>Humidity: {data.main?.humidity}%</p>
    </div>
  );
}
