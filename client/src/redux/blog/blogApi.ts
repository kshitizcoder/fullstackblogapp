import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery,
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/api/v1/blogs/",
        method: "POST",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
        method: "DELETE",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/blogs/${id}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "/api/v1/blogs/",
      }),
    }),
    getBlogs: builder.query({
      query: (queryObj) => ({
        url: `/api/v1/blogs?${queryObj}`,
      }),
    }),
    getBLogsByAuthor: builder.query({
      query: () => ({
        url: "/api/v1/blogs/author/blogs",
      }),
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/api/v1/blogs/${id}`,
      }),
    }),
  }),
});

export const {
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useGetBLogsByAuthorQuery,
  useGetBlogByIdQuery,
  useGetBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
