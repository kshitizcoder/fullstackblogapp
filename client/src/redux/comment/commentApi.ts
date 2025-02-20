import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery,
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ blog, comment }) => ({
        url: "/api/v1/comments/",
        method: "POST",
        body: { blog, comment },
      }),
    }),
    getALLComments: builder.query({
      query: () => ({
        url: "/api/v1/comments/",
      }),
    }),
  }),
});

export const { useAddCommentMutation, useGetALLCommentsQuery } = commentApi;
