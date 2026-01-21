import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    // login user
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // get logged in user profile
    getProfile: builder.query({
      query: () => "/users/my-profile",
    }),

    // logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useLogoutUserMutation } =
  authApi;
