import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery,
  tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    // Dashboard stats
    getDashboardStats: builder.query({
      query: () => "/admin/dashboard/stats",
      providesTags: ["Dashboard"],
    }),

    // Communities list
    getCommunities: builder.query({
      query: () => "/admin/get-communities",
      providesTags: ["Dashboard"],
    }),

    // Get revenue chart data
    getRevenueStats: builder.query({
      query: ({ communities = [] }) => ({
        url: "/admin/revenue",
        method: "POST",
        body: {
          communities,
        },
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetCommunitiesQuery,
  useGetRevenueStatsQuery,
} = dashboardApi;
