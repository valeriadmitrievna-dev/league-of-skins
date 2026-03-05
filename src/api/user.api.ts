import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { IUser, IUserSkinsStatistic } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SkinsRequest, UpdateOwnedSkinsRequest } from "./types";
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
  }),
});

export const { useGetUserQuery, useGetOwnedSkinsQuery, useUpdateOwnedSkinsMutation, useGetOwnedSkinsStatsQuery } = userApi;
