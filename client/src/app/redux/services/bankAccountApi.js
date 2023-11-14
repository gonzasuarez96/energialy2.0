import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bankAccountApi = createApi({
  reducerPath: "bankAccounts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getBankAccount: builder.query({
      query: () => "/bankAccounts",
    }),
    getBankAccountById: builder.query({
      query: (id) => `/bankAccounts/${id}`,
    }),
  }),
});

export const { useGetBankAccountQuery, useGetBankAccountByIdQuery } = bankAccountApi;