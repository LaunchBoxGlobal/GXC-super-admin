import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // get users with pagination and search
    getUsers: builder.query({
      query: ({ page = 1, limit = 10, search = "", userType }) => ({
        url: "/admin/users",
        method: "GET",
        params: {
          userType,
          page,
          limit,
          ...(search && { search }),
        },
      }),
      // providesTags: ["Users"],
    }),

    // get user profile by ID
    getUserProfile: builder.query({
      query: (userId) => `/admin/users/${userId}`,
      // providesTags: (result, error, userId) => [{ type: "Users", id: userId }],
    }),

    // update user status (suspend/ban)
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/admin/users/${userId}/status`,
        method: "PUT",
        body: { status },
      }),
      // invalidatesTags: ["Users"],
    }),

    // Get user reviews
    getUserReviews: builder.query({
      query: (userId) => ({
        url: `/reviews/users/${userId}/reviews`,
      }),
      providesTags: (result, error, userId) => [
        { type: "UserReviews", id: userId },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserProfileQuery,
  useUpdateUserStatusMutation,
  useGetUserReviewsQuery,
} = usersApi;
