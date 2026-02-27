import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { IUser } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UpdateOwnedSkinsRequest } from './types';
import type { SkinDto } from '@/types/skin';

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
  tagTypes: ["User", "OwnedSkins"],
  endpoints: (build) => ({
    getUser: build.query<IUser, void>({
      query: () => "/",
      providesTags: ["User"],
    }),
    getOwnedSkins: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage>({
      query: ({ lang }) => ({
        url: "/owned/skins",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
      providesTags: ["OwnedSkins"],
    }),
    updateOwnedSkins: build.mutation<IUser, UpdateOwnedSkinsRequest>({
      query: (body) => ({
        url: "/owned/skins",
        method: 'put',
        body,
      }),
      invalidatesTags: ["User", "OwnedSkins"],
    }),
  }),
});

export const { useGetUserQuery, useGetOwnedSkinsQuery, useUpdateOwnedSkinsMutation } = userApi;
