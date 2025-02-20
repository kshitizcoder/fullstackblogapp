import Cookies from "js-cookie";
import { BASE_URL } from "./api";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("jwt");
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("JWT Token is undefined");
    }

    return headers;
  },
});
export default baseQuery;
