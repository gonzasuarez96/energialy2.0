import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlProduction } from "@/app/data/dataGeneric";

export const locationApi = createApi({
    reducerPath: "locations",
    baseQuery: fetchBaseQuery({ baseUrl: urlProduction }),
    endpoints: (builder) => ({
      getLocations: builder.query({
        query: () => "/locations",
      }),
    })
})

export const { useGetLocationsQuery } = locationApi;