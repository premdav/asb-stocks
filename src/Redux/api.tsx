import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { Stock, TenDay } from '../Types/AppTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Stocks', 'Tenday'],
  endpoints: (build) => ({
    getStocks: build.query<Stock[], void>({
      query: () => 'stocks',
      providesTags: (result) => 
        result ? [
          ...result.map(({ id }) => ({ type: 'Stocks' as const, id })),
          { type: 'Stocks', id: 'ALL' },
          ] : [{ type: 'Stocks', id: 'ALL' }],
    }),
    getTenDay: build.query<TenDay[], void>({
      query: () => 'tenday',
      providesTags: (result) => 
        result ? [
          ...result.map(({ date }) => ({ type: 'Tenday' as const, date })),
          { type: 'Tenday', date: 'ALL' },
          ] : [{ type: 'Stocks', date: 'ALL' }],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useGetTenDayQuery,
} = api;
