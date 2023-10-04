import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const financeProductsApi = createApi({
  reducerPath: "financeProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getBankAccount: builder.query({
      query: () => "/financeProducts",
    }),
    getBankAccountById: builder.query({
      query: (id) => `/financeProducts/${id}`,
    }),
  }),
});

export const { useGetFinanceProductsQuery, useGetFinanceProductsByIdQuery } = financeProductsApi;
