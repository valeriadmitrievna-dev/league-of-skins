import type { ODataRequest, ODataResponse, WithLanguage } from "@/shared/types";
import type { ChampionDto, ChromaDto, SkinlineDto, SkinDto } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SkinsRequest } from "./types";
import { LANGUAGES } from "@/shared/constants/languages";
import { getColorsString } from '@/shared/utils/getColorsString';

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
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
        headers: { "App-Language": LANGUAGES[lang as keyof typeof LANGUAGES] },
      }),
    }),

    // skinlines
    getSkinlines: build.query<ODataResponse<SkinlineDto[]>, WithLanguage<ODataRequest>>({
      query: ({ lang, ...params }) => ({
        url: "/skinlines",
        params,
        headers: { "App-Language": LANGUAGES[lang as keyof typeof LANGUAGES] },
      }),
    }),

    // champions
    getChampions: build.query<ODataResponse<ChampionDto[]>, WithLanguage<ODataRequest | void>>({
      query: ({ lang, ...params }) => ({
        url: "/champions",
        params: params ?? {},
        headers: { "App-Language": LANGUAGES[lang as keyof typeof LANGUAGES] },
      }),
    }),
    getChampionById: build.query<ChampionDto, WithLanguage<{ id: string }>>({
      query: ({ lang, id }) => ({
        url: "/champions/" + id,
        headers: { "App-Language": LANGUAGES[lang as keyof typeof LANGUAGES] },
      }),
    }),

    // skins
    getSkins: build.query<ODataResponse<SkinDto[]>, WithLanguage<SkinsRequest>>({
      query: ({ lang, ...params }) => ({
        url: "/skins",
        params: params ? { ...params, colors: getColorsString(params.colors) } : {},
        headers: { "App-Language": LANGUAGES[lang as keyof typeof LANGUAGES] },
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
} = dataApi;
