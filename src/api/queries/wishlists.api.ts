import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { RootState } from "@/store/types";
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newWishlist } = await queryFulfilled;

          dispatch(
            wishlistApi.util.updateQueryData("getWishlists", undefined, (draft) => {
              draft.push(newWishlist);
            }),
          );
        } catch {}
      },
      invalidatesTags: ["User"],
    }),

    updateWishlist: build.mutation<WishlistFullDto, { wishlistId: string; body: UpdateWishlistBody }>({
      query: ({ wishlistId, body }) => ({
        url: `/users/wishlists/${wishlistId}`,
        method: "put",
        body,
      }),
      async onQueryStarted({ wishlistId, body }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const lang = state.app.language;

        const { addSkinIds = [], removeSkinIds = [], addChromaIds = [], removeChromaIds = [] } = body;
        if (!addSkinIds.length && !removeSkinIds.length && !addChromaIds.length && !removeChromaIds.length) return;

        const patch = dispatch(
          wishlistApi.util.updateQueryData("getWishlists", undefined, (draft) => {
            const wishlist = draft.find((w) => w._id === wishlistId);
            if (!wishlist) return;

            wishlist.skins = [...wishlist.skins, ...addSkinIds].filter((id) => !removeSkinIds.includes(id));
            wishlist.chromas = [...wishlist.chromas, ...addChromaIds].filter((id) => !removeChromaIds.includes(id));
          }),
        );

        const removeFromWishlistPagePatch = dispatch(
          wishlistApi.util.updateQueryData("getWishlist", { wishlistId, lang }, (draft) => {
            if (!removeSkinIds.length && !removeChromaIds.length) return;

            draft.skins = draft.skins.filter((skin) => !removeSkinIds.includes(skin.contentId));
            draft.chromas = draft.chromas.filter((chroma) => !removeChromaIds.includes(chroma.contentId));
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
          removeFromWishlistPagePatch.undo();
        }
      },
      invalidatesTags: (_, __, { body }) => (body.name !== undefined || body.private !== undefined ? ["Wishlists"] : []),
    }),

    deleteWishlist: build.mutation<true, string>({
      query: (wishlistId) => ({
        url: `/users/wishlists/${wishlistId}`,
        method: "delete",
      }),
      async onQueryStarted(wishlistId, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          wishlistApi.util.updateQueryData("getWishlists", undefined, (draft) => {
            return draft.filter((w) => w._id !== wishlistId);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["User"],
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
