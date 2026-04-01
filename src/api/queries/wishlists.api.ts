import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, PaginatedRequest, WithLanguage } from "@/types/shared";
import type { WishlistDto, WishlistFullDto, UpdateWishlistBody } from "@/types/wishlist";

import { baseApi } from "./base.api";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getWishlists: build.query<WishlistDto[], void>({
      query: () => "/users/wishlists",
      providesTags: ["Wishlists"],
    }),

    getWishlist: build.query<WishlistFullDto, WithLanguage<{ wishlistId: string }>>({
      query: ({ wishlistId, lang }) => ({
        url: `/users/wishlists/${wishlistId}`,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
      providesTags: ["Wishlists"],
    }),

    createWishlist: build.mutation<WishlistDto, { name: string }>({
      query: (body) => ({
        url: "/users/wishlists",
        method: "post",
        body,
      }),
      invalidatesTags: ["User", "Wishlists"],
    }),

    updateWishlist: build.mutation<WishlistFullDto, { wishlistId: string; body: UpdateWishlistBody }>({
      query: ({ wishlistId, body }) => ({
        url: `/users/wishlists/${wishlistId}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Wishlists"],
    }),

    deleteWishlist: build.mutation<true, string>({
      query: (wishlistId) => ({
        url: `/users/wishlists/${wishlistId}`,
        method: "delete",
      }),
      invalidatesTags: ["User", "Wishlists"],
    }),

    getGuestWishlist: build.query<WishlistFullDto, WithLanguage<{ link: string }>>({
      query: ({ link, lang }) => ({
        url: `/users/wishlists/guest/${link}`,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    searchWishlists: build.query<ODataResponse<WishlistDto[]>, PaginatedRequest<{ search: string }>>({
      query: (params) => ({
        url: "/users/wishlists/search",
        params,
      }),
    }),

    getSubscribedWishlists: build.query<WishlistDto[], void>({
      query: () => ({
        url: "/users/wishlists/subscribed",
      }),
      providesTags: ["Wishlists"],
    }),

    subscribeWishlist: build.mutation<void, string>({
      query: (wishlistId) => ({
        url: `/users/wishlists/${wishlistId}/subscribe`,
        method: "put",
      }),
      invalidatesTags: ["Wishlists", "User"],
    }),

    unsubscribeWishlist: build.mutation<void, string>({
      query: (wishlistId) => ({
        url: `/users/wishlists/${wishlistId}/unsubscribe`,
        method: "put",
      }),
      invalidatesTags: ["Wishlists", "User"],
    }),
  }),
});

export const {
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
  useGetGuestWishlistQuery,
  useLazySearchWishlistsQuery,
  useGetSubscribedWishlistsQuery,
  useSubscribeWishlistMutation,
  useUnsubscribeWishlistMutation,
} = wishlistApi;
