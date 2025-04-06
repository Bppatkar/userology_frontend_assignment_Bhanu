import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    crypto: loadFromLocalStorage('cryptoFavorites'),
    weather: loadFromLocalStorage('weatherFavorites')
  },
  reducers: {
    toggleCryptoFavorite: (state, action) => {
      const index = state.crypto.indexOf(action.payload);
      if (index === -1) {
        state.crypto.push(action.payload);
      } else {
        state.crypto.splice(index, 1);
      }
      localStorage.setItem('cryptoFavorites', JSON.stringify(state.crypto));
    },
    toggleWeatherFavorite: (state, action) => {
      const index = state.weather.indexOf(action.payload);
      if (index === -1) {
        state.weather.push(action.payload);
      } else {
        state.weather.splice(index, 1);
      }
      localStorage.setItem('weatherFavorites', JSON.stringify(state.weather));
    }
  }
});

export const { toggleCryptoFavorite, toggleWeatherFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;