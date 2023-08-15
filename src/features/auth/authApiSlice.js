import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
      // transformResponse: (response, meta, arg) => response.data,
    }),
    sendLogout: build.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // forgotPassword: bui
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  // useRefreshMutation
} = authApiSlice;
