import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { IUser, IUserSkinsStatistic } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SkinsRequest, UpdateOwnedSkinsRequest, UpdateUserPasswordRequest } from "./types";
import type { SkinDto } from "@/types/skin";

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
  tagTypes: ["User", "OwnedSkins", "Stats"],
  endpoints: (build) => ({
    getUser: build.query<IUser, string | void>({
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
    getOwnedSkins: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage<Omit<SkinsRequest, "owned">>>({
      query: ({ lang, ...params }) => ({
        url: "/owned/skins",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
      providesTags: ["OwnedSkins"],
    }),
    updateOwnedSkins: build.mutation<IUser, UpdateOwnedSkinsRequest>({
      query: (body) => ({
        url: "/owned/skins",
        method: "put",
        body,
      }),
      invalidatesTags: ["User", "OwnedSkins", "Stats"],
    }),
    getOwnedSkinsStats: build.query<IUserSkinsStatistic, WithLanguage>({
      query: ({ lang }) => ({
        url: "/owned/skins/stats",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
      providesTags: ["Stats"],
    }),
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
  useUploadInventoryMutation,
} = userApi;
