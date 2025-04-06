"use client";
import { useRouter } from 'next/navigation';

export default function WeatherDetail({ city }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <button 
        onClick={() => router.back()}
        className="mb-4 text-blue-400 hover:underline"
      >
        ← Back to Dashboard
      </button>
      
      <h1 className="text-2xl font-bold mb-2">Weather in {city.name}</h1>
      {/* Add detailed weather content here */}
    </div>
  );
}