import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Get all orders (pagination + search + status)
    getOrders: builder.query({
      query: ({ page = 1, limit = 10, search = "", status }) => ({
        url: "/admin/orders",
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(search && { search }),
        },
      }),
      providesTags: ["Orders"],
    }),

    // Get order by ID
    getOrderItemById: builder.query({
      query: (itemId) => `/admin/order-item/${itemId}`,
      providesTags: (result, error, itemId) => [{ type: "Orders", id: itemId }],
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderItemByIdQuery } = ordersApi;
