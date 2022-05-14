import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from './slices/authSlice';
import { stockInfo } from "./slices/stockInfoSlice";
import { api } from "./api";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice.reducer,
  stockInfo: stockInfo.reducer,
});

export default rootReducer;
