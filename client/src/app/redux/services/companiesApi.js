import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companiesApi = createApi({
  reducerPath: "companies",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/companies",
    }),
    getCompaniesById: builder.query({
      query: (id) =>  `/companies/${id}`,
    })
  }),
});

export const { useGetCompaniesQuery, useGetCompaniesByIdQuery } = companiesApi;
