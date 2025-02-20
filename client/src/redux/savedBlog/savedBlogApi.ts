import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";
export const savedBlogApi = createApi({
  reducerPath: "savedBlogApi",
  baseQuery,
  tagTypes: ["SavedBlog"],
  endpoints: (builder) => ({
    toggleSavedBlog: builder.mutation({
      query: ({ blog }) => ({
        url: `/api/v1/saved-blogs`,
        method: "POST",
        body: { blog },
      }),
      invalidatesTags: ["SavedBlog"],
    }),
    getAllSavedBlogs: builder.query({
      query: () => ({
        url: "/api/v1/saved-blogs",
      }),
      providesTags: ["SavedBlog"],
    }),
  }),
});

export const { useToggleSavedBlogMutation, useGetAllSavedBlogsQuery } =
  savedBlogApi;
