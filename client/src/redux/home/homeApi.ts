import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllBlogByCategory: builder.query({
      query: (category) => ({
        url: `/api/v1/blogs?category=${category}&sortBy=newest`,
      }),
    }),
  }),
});

export const { useGetAllBlogByCategoryQuery } = homeApi;
