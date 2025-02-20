import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/api/v1/categories/",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
