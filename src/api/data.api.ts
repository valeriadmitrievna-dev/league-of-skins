import type { ODataRequest, ODataResponse, WithLanguage } from "@/types/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SkinsRequest } from "./types";
import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ChromaDto } from '@/types/chroma';
import type { SkinlineDto } from '@/types/skinline';
import type { ChampionDto } from '@/types/champion';
import type { SkinDto } from '@/types/skin';

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
  }),
  endpoints: (build) => ({
    // shared
    getVersions: build.query<string[], void>({
      query: () => "/shared/versions",
    }),
    getLanguages: build.query<string[], void>({
      query: () => "/shared/languages",
    }),
    getRarities: build.query<string[], void>({
      query: () => "/shared/rarities",
    }),
    getChromas: build.query<ODataResponse<ChromaDto[]>, WithLanguage<ODataRequest | void>>({
      query: ({ lang }) => ({
        url: "/shared/chromas",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    // skinlines
    getSkinlines: build.query<ODataResponse<SkinlineDto[]>, WithLanguage<ODataRequest>>({
      query: ({ lang, ...params }) => ({
        url: "/skinlines",
        params,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    // champions
    getChampions: build.query<ODataResponse<ChampionDto[]>, WithLanguage<ODataRequest | void>>({
      query: ({ lang, ...params }) => ({
        url: "/champions",
        params: params ?? {},
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),
    getChampionById: build.query<ChampionDto, WithLanguage<{ id: string }>>({
      query: ({ lang, id }) => ({
        url: "/champions/" + id,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    // skins
    getSkins: build.query<ODataResponse<SkinDto[]>, WithLanguage<SkinsRequest>>({
      query: ({ lang, ...params }) => ({
        url: "/skins",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
    }),
    getSkin: build.query<SkinDto, WithLanguage<{ contentId: string }>>({
      query: ({ lang, contentId }) => ({
        url: "/skins/" + contentId,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),
  }),
});

export const {
  useGetVersionsQuery,
  useGetLanguagesQuery,
  useGetRaritiesQuery,
  useGetChromasQuery,
  useLazyGetChromasQuery,

  useGetSkinlinesQuery,
  useLazyGetSkinlinesQuery,

  useGetChampionsQuery,
  useLazyGetChampionsQuery,
  useGetChampionByIdQuery,
  useLazyGetChampionByIdQuery,

  useGetSkinsQuery,
  useLazyGetSkinsQuery,
  useGetSkinQuery,
  useLazyGetSkinQuery,
} = dataApi;
