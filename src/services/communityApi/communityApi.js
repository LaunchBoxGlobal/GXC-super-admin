import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery,
  tagTypes: ["Communities"],
  endpoints: (builder) => ({
    // Get user communities
    getUserCommunities: builder.query({
      query: ({ ownerId, search = "", status = "active" }) => ({
        url: `/admin/user/${ownerId}/communities`,
        params: {
          status,
          ...(search && { search }),
        },
      }),
      providesTags: ["Communities"],
    }),

    // Get community details by slug
    getCommunityDetails: builder.query({
      query: (communitySlug) => ({
        url: `/communities/${communitySlug}/details`,
      }),
      providesTags: (result, error, slug) => [{ type: "Community", id: slug }],
    }),

    // Enable / Disable community
    updateCommunityStatus: builder.mutation({
      query: ({ communityId, status }) => ({
        url: `/admin/community/status/${communityId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Community"],
    }),

    // Get community products
    getCommunityProducts: builder.query({
      query: ({
        communityId,
        page = 1,
        limit = 10,
        search = "",
        status = "active",
      }) => ({
        url: `/communities/${communityId}/products`,
        params: {
          page,
          limit,
          status,
          ...(search && { search }),
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "CommunityProducts", id: arg.communityId },
      ],
    }),

    // Get community members
    getCommunityMembers: builder.query({
      query: ({ communityId, limit = 1000 }) => ({
        url: `/communities/${communityId}/members`,
        params: {
          limit,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "CommunityMembers", id: arg.communityId },
      ],
    }),
  }),
});

export const {
  useGetUserCommunitiesQuery,
  useGetCommunityDetailsQuery,
  useUpdateCommunityStatusMutation,
  useGetCommunityProductsQuery,
  useGetCommunityMembersQuery,
} = communityApi;
