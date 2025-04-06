// components/CryptoCard.jsx
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

  if (!isClient) return <Skeleton type="crypto" />;

  return (
    <div className="card">
      <h2>Crypto Prices</h2>
      <div className="grid grid-cols-2 gap-4">
        <CryptoItem coin="Bitcoin" price={data.bitcoin?.usd} status={status} />
        <CryptoItem coin="Ethereum" price={data.ethereum?.usd} status={status} />
      </div>
    </div>
  );
}

const CryptoItem = ({ coin, price, status }) => (
  <div>
    <h3>{coin}</h3>
    {status === 'loading' ? (
      <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
    ) : (
      <p>${price?.toLocaleString() || '--'}</p>
    )}
  </div>
);