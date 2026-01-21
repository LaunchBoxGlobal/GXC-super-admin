import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // Get all products (pagination + search + status)
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, search = "", status }) => ({
        url: "/admin/products",
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(search && { search }),
        },
      }),
    }),

    // Get product by ID
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Products", id: productId },
      ],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
