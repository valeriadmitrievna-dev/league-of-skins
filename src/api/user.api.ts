import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { SkinDto } from "@/store";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { IUser } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  endpoints: (build) => ({
    getUser: build.query<IUser, void>({
      query: () => "/",
    }),
    getOwnedSkins: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage>({
      query: ({ lang }) => ({
        url: "/owned/skins",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetOwnedSkinsQuery } = userApi;
