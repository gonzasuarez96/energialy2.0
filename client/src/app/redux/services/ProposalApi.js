import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlProduction } from "@/app/data/dataGeneric";

export const proposalsApi = createApi({
  reducerPath: "proposal",
  baseQuery: fetchBaseQuery({ baseUrl: urlProduction }),
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
