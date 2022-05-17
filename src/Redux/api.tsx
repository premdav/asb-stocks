import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { Stock, StockRequest, TenDay } from '../Types/AppTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Stocks', 'Tenday'],
  endpoints: (build) => ({
    getStocks: build.query<Stock[], void>({
      query: () => 'stocks',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Stocks' as const, id })), 'Stocks']
          : ['Stocks'],
    }),
    addStock: build.mutation<Stock, Partial<StockRequest>>({
      query: (body) => ({
        url: 'stocks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stocks'],
    }),
    deleteStock: build.mutation<Stock, number>({
      query: (id) => ({
        url: `stocks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Stocks', id },
      ],
    }),
    getTenDay: build.query<TenDay[], void>({
      query: () => 'tenday',
      providesTags: ['Tenday'],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useGetTenDayQuery,
  useAddStockMutation,
  useDeleteStockMutation,
} = api;
