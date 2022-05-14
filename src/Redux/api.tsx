import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { Stock } from '../Types/AppTypes';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Stocks', 'Details'],
  endpoints: (build) => ({
    getStocks: build.query<Stock[], void>({
      query: () => 'stocks',
      providesTags: (result) => 
        result ? [
          ...result.map(({ id }) => ({ type: 'Stocks' as const, id })),
          { type: 'Stocks', id: 'ALL' },
          ] : [{ type: 'Stocks', id: 'ALL' }],
    }),
  }),
});

export const {
  useGetStocksQuery,
} = api;
