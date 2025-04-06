// store/cryptoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCrypto = createAsyncThunk('crypto/fetch', async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
});

const initialState = {
  data: { bitcoin: { usd: 0 }, ethereum: { usd: 0 } },
  status: 'idle',
  error: null
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default cryptoSlice.reducer;