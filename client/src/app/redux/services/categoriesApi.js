import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
