"use client";
import { useState, useEffect } from 'react';

export default function useFavorites(key) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      setFavorites(stored ? JSON.parse(stored) : []);
    }
  }, [key]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id];
      localStorage.setItem(key, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return [favorites, toggleFavorite];
}