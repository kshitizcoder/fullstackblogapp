import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/api/v1/users/profile",
      }),
    }),
    getALLUsers: builder.query({
      query: () => ({
        url: "/api/v1/users/",
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: `/api/v1/users/`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useGetALLUsersQuery,
  useUpdateProfileMutation,
} = userApi;
