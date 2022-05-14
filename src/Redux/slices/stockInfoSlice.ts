import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stock } from '../../Types/AppTypes';

interface StockInfoState {
  favorites: Stock[],
  detailStock: Stock | null,
}

const initialState: StockInfoState = {
  favorites: [],
  detailStock: null,
};

export const stockInfo = createSlice({
  name: 'stockInfo',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Stock>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<Stock>) => {
      state.favorites = state.favorites.filter((fav) => fav.id !== action.payload.id);
    },
    setDetailStock: (state, action: PayloadAction<Stock | null>) => {
      state.detailStock = action.payload;
    },
  },
});

export const stockInfoActions = stockInfo.actions;

export default stockInfo;