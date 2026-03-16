import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import type { UserDto, UserSkinsStatisticDto } from "@/types/user";
import type { UpdateWishlistBody, WishlistFullDto, WishlistDto } from "@/types/wishlist";

import type { SkinsRequest, UpdateOwnedSkinsRequest, UpdateUserPasswordRequest } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/users`,
    prepareHeaders(headers) {
      const token = localStorage.getItem("access-token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["User", "OwnedSkins", "Stats", "Wishlists"],
  endpoints: (build) => ({
    // ****** USER ******
    getUser: build.query<UserDto, void>({
      query: () => "/",
      providesTags: ["User"],
    }),
    updateUserPassword: build.mutation<{ success: true }, UpdateUserPasswordRequest>({
      query: (body) => ({
        url: "/password",
        method: "put",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // ****** OWNED SKINS ******
    getOwnedSkins: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage<Omit<SkinsRequest, "owned">>>({
      query: ({ lang, ...params }) => ({
        url: "/owned/skins",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
      providesTags: ["OwnedSkins"],
    }),
    updateOwnedSkins: build.mutation<UserDto, UpdateOwnedSkinsRequest>({
      query: (body) => ({
        url: "/owned/skins",
        method: "put",
        body,
      }),
      invalidatesTags: ["User", "OwnedSkins", "Stats"],
    }),
    getOwnedSkinsStats: build.query<UserSkinsStatisticDto, WithLanguage>({
      query: ({ lang }) => ({
        url: "/owned/skins/stats",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
      providesTags: ["Stats"],
    }),

    // ****** WISHLISTS ******
    getWishlists: build.query<WishlistDto[], void>({
      query: () => "/wishlists",
      providesTags: ["Wishlists"],
    }),
    getWishlist: build.query<WishlistFullDto, string>({
      query: (wishlistId) => "/wishlists/" + wishlistId,
      providesTags: ["Wishlists"],
    }),
    createWishlist: build.mutation<WishlistDto, { name: string }>({
      query: (body) => ({
        url: "/wishlists",
        method: "post",
        body,
      }),
      invalidatesTags: ["User", "Wishlists"],
    }),
    updateWishlist: build.mutation<WishlistFullDto, { wishlistId: string; body: UpdateWishlistBody }>({
      query: ({ wishlistId, body }) => ({
        url: "/wishlists/" + wishlistId,
        method: "put",
        body,
      }),
      invalidatesTags: ["Wishlists"],
    }),
    deleteWishlist: build.mutation<true, string>({
      query: (wishlistId) => ({
        url: "/wishlists/" + wishlistId,
        method: "delete",
      }),
      invalidatesTags: ["User", "Wishlists"],
    }),

    // ****** INVENTORY ******
    uploadInventory: build.mutation<boolean, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file, file.name);

        return {
          url: "/inventory",
          method: "post",
          body: formData,
        };
      },
      invalidatesTags: ["User", "OwnedSkins", "Stats"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserPasswordMutation,
  useGetOwnedSkinsQuery,
  useUpdateOwnedSkinsMutation,
  useGetOwnedSkinsStatsQuery,
  useGetWishlistsQuery,
  useGetWishlistQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
  useUploadInventoryMutation,
} = userApi;
