import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   credentials: "include",
// });

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/login",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/api/v1/users/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/api/v1/users/update-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password, passwordConfirm }) => ({
        url: `/api/v1/users/reset-password/${token}`,
        method: "PATCH",
        body: { password, passwordConfirm },
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/v1/users/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutMutation,
  useSignUpMutation,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
