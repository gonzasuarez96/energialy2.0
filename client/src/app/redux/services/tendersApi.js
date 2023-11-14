import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tendersApi = createApi({
  reducerPath: "tenders",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getTenders: builder.query({
      query: () => "/tenders",
    }),
    getTenderById: builder.query({
      query: (id) => `/tenders/${id}`,
    })
  }),
});

export const { useGetTendersQuery, useGetTenderByIdQuery } = tendersApi;

