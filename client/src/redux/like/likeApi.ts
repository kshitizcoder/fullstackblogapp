// import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../api";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    // const token = Cookies.get("jwt");
    const token = localStorage.getItem("jwt");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("JWT Token is undefined");
    }

    return headers;
  },
});

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery,
  endpoints: (builder) => ({
    toggleLike: builder.mutation({
      query: ({ blog }) => ({
        url: `/api/v1/likes`,
        method: "POST",
        body: { blog },
      }),
    }),
  }),
});

export const { useToggleLikeMutation } = likeApi;
