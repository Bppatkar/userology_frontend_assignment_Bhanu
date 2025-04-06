import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import weatherReducer from "./weatherSlice";
import newsReducer from "./newsSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
    favorites: favoritesReducer,
  },
});

export default store;