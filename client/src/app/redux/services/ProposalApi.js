import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proposalsApi = createApi({
  reducerPath: "proposal",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getProposals: builder.query({
      query: () => "/proposals",
    }),
    getProposalById: builder.query({
      query: (id) => `/proposals/${id}`,
    }),
  }),
});

export const { useGetProposalsQuery, useGetProposalByIdQuery } = proposalsApi;
