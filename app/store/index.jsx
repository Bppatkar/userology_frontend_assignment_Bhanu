import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";
import weatherReducer from "./weatherSlice";
import newsReducer from "./newsSlice";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    weather: weatherReducer,
    news: newsReducer,
  },
});

export default store;