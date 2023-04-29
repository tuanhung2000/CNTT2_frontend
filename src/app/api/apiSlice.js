import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9090/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const token = getState().auth.token;
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Note", "User"],
  endpoints: (build) => ({}),
});
