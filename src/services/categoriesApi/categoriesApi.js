// services/categoriesApi/categoriesApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: ({ limit = 1000, search = "" }) => ({
        url: "/categories",
        params: {
          limit,
          ...(search && { search }),
        },
      }),
      providesTags: ["Categories"],
    }),

    //  Add category
    addCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Edit category
    editCategory: builder.mutation({
      query: ({ categoryId, name }) => ({
        url: "/categories",
        method: "PUT",
        body: {
          categoryId,
          name,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} = categoriesApi;
