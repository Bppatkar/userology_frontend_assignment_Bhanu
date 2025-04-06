import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;


export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);
  if (!res.ok) throw new Error('Failed to fetch weather');
  return res.json();
});


const weatherSlice = createSlice({
  name: "weather",
  initialState: { 
  data: {
    name: "",
    main: {
      temp: 0,
      humidity: 0
    }
  },
  status: "idle"
},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.status = "loading"; })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => { state.status = "failed"; });
  },
});

export default weatherSlice.reducer;
