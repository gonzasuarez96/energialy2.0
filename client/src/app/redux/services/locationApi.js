import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
    reducerPath: "locations",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: (builder) => ({
      getLocations: builder.query({
        query: () => "/locations",
      }),
    })
})

export const { useGetLocationsQuery } = locationApi;