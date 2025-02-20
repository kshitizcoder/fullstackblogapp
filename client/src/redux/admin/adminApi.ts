import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../baseQuery";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery,
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => "/api/v1/admin-stats/stats",
    }),
  }),
});

export const { useGetAdminStatsQuery } = adminApi;
