import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery,
  tagTypes: ["Reports"],
  endpoints: (builder) => ({
    // get bug reports
    getBugReports: builder.query({
      query: ({ page = 1, limit = 10, search = "", type }) => ({
        url: "/reports/bugs",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(type && { type }),
        },
      }),
      providesTags: (result, error, arg) => [{ type: "Reports", id: arg.type }],
    }),

    // get all reported products
    getReportedProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/admin/product-reports/list",
        params: {
          page,
          limit,
          ...(search && { search }),
        },
      }),
      providesTags: ["Reports"],
    }),

    // get item reports that have been marked as missing
    getMissingItemReports: builder.query({
      query: ({ page = 1, limit = 10, search = "", status }) => ({
        url: "/admin/order-reports",
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(status && { status }),
        },
      }),
      providesTags: ["MissingItemReports"],
    }),

    // get missing item report details
    getMissingItemReportDetails: builder.query({
      query: (reportId) => ({
        url: `/admin/order-reports/${reportId}`,
        providesTags: (result, error, reportId) => [
          { type: "MissingItemReports", id: reportId },
        ],
      }),
    }),

    // update missing item report status
    updateMissingItemReportStatus: builder.mutation({
      query: ({ reportId, status }) => ({
        url: "/admin/order-reports/update",
        method: "POST",
        body: {
          reportId,
          status,
        },
      }),
      invalidatesTags: ["MissingItemReports"],
    }),

    // Get reported product details
    getReportedProductDetails: builder.query({
      query: (reportId) => ({
        url: `/admin/product-reports/${reportId}`,
      }),
      providesTags: (result, error, reportId) => [
        { type: "ProductReports", id: reportId },
      ],
    }),
  }),
});

export const {
  useGetBugReportsQuery,
  useGetReportedProductsQuery,
  useGetMissingItemReportsQuery,
  useGetMissingItemReportDetailsQuery,
  useUpdateMissingItemReportStatusMutation,
  useGetReportedProductDetailsQuery,
} = reportsApi;
