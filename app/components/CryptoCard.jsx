"use client";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrypto } from '@/store/cryptoSlice';
import Skeleton from './Skeleton';

export default function CryptoCard() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.crypto);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchCrypto());
  }, [dispatch]);

  if (!isClient || status === 'loading') return <Skeleton type="crypto" />;

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">💰 Crypto Prices</h2>
      <div className="space-y-2">
      {Object.entries(data).map(([coinId, coinData]) => (
  <div key={coinId} className="flex justify-between items-center">
    <span className="capitalize">{coinId}</span>
    <span>${coinData.usd.toLocaleString()}</span>
  </div>
))}

      </div>
    </div>
  );
}
