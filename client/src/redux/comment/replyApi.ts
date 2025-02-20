import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const replyApi = createApi({
  reducerPath: "replyApi",
  baseQuery,
  endpoints: (builder) => ({
    addReply: builder.mutation({
      query: ({ reply, comment }) => ({
        url: "/api/v1/replies",
        method: "POST",
        body: { reply, comment },
      }),
    }),
  }),
});

export const { useAddReplyMutation } = replyApi;
