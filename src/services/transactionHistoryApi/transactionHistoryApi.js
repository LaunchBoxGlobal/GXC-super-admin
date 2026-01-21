import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const transactionHistoryApi = createApi({
  reducerPath: "transactionHistoryApi",
  baseQuery,
  tagTypes: ["TransactionHistory"],
  endpoints: (builder) => ({
    // Get transaction history (pagination + search )
    getTransactions: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/admin/transactions",
        params: {
          page,
          limit,
          ...(search && { search }),
        },
      }),
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionHistoryApi;
