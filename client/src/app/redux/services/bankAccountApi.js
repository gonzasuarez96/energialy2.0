import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlProduction } from "@/app/data/dataGeneric";

export const bankAccountApi = createApi({
  reducerPath: "bankAccounts",
  baseQuery: fetchBaseQuery({ baseUrl: urlProduction }),
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