import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query({
      query: () => {
        return {
          url: `/user/details`,
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userApiSlice;
