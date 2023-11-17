import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlProduction } from "@/app/data/dataGeneric";

export const tendersApi = createApi({
  reducerPath: "tenders",
  baseQuery: fetchBaseQuery({ baseUrl: urlProduction }),
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

