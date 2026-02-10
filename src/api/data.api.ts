import type { ODataRequest, ODataResponse } from "@/shared/types";
import type { ChampionDto, ChromaDto, RootState, SkinlineDto } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SkinsRequest } from './types';
import { LANGUAGES } from '@/shared/constants/languages';

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders(headers, { getState }) {
      headers.set("Content-Type", "application/json");
      const shortLanguage = (getState() as RootState).app.language as keyof typeof LANGUAGES;
      headers.set("App-Language", LANGUAGES[shortLanguage]);

      return headers;
    },
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
    getChromas: build.query<ODataResponse<ChromaDto>, ODataRequest | void>({
      query: () => "/shared/chromas",
    }),

    // skinlines
    getSkinlines: build.query<ODataResponse<SkinlineDto[]>, ODataRequest | void>({
      query: () => "/skinlines",
    }),

    // champions
    getChampions: build.query<ODataResponse<ODataResponse<ChampionDto[]>>, ODataRequest | void>({
      query: () => "/champions",
    }),
    getChampionById: build.query<ChampionDto, string>({
      query: (championId) => "/champions/" + championId,
    }),

    // skins
    getSkins: build.query<ODataResponse<ODataResponse<ChampionDto[]>>, SkinsRequest>({
      query: (params) => ({
        url: "/skins",
        params: { ...params, colors: params.colors?.join(',') },
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
