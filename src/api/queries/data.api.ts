import { createApi } from "@reduxjs/toolkit/query/react";

import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ChampionDto } from "@/types/champion";
import type { ChromaDto } from "@/types/chroma";
import type { ODataResponse, PaginatedRequest, WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import type { SkinlineDto } from "@/types/skinline";

import { makeBaseQueryWithReauth } from '../queries';
import type { ChromasRequest, SkinsRequest } from "../types";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: makeBaseQueryWithReauth(`${import.meta.env.VITE_API_URL}/api`),
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
    getChromas: build.query<ODataResponse<ChromaDto[]>, WithLanguage>({
      query: ({ lang }) => ({
        url: "/shared/chromas",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    // skinlines
    getSkinlines: build.query<ODataResponse<SkinlineDto[]>, PaginatedRequest<WithLanguage>>({
      query: ({ lang, ...params }) => ({
        url: "/skinlines",
        params,
        headers: { "App-Language": getLanguageCode(lang) },
      }),
    }),

    // champions
    getChampions: build.query<ODataResponse<ChampionDto[]>, PaginatedRequest<WithLanguage>>({
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
    getSkins: build.query<ODataResponse<SkinDto[]>, PaginatedRequest<WithLanguage<SkinsRequest>>>({
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

    // chromas
    getAllChromas: build.query<ODataResponse<ChromaDto[]>, PaginatedRequest<WithLanguage<ChromasRequest>>>({
      query: ({ lang, ...params }) => ({
        url: "/chromas",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
    }),
  }),
});

export const {
  useGetVersionsQuery,
  useGetLanguagesQuery,
  useGetRaritiesQuery,
  useGetChromasQuery,

  useGetSkinlinesQuery,

  useGetChampionsQuery,
  useLazyGetChampionsQuery,
  useGetChampionByIdQuery,

  useGetSkinsQuery,
  useLazyGetSkinsQuery,
  useGetSkinQuery,
  useLazyGetSkinQuery,

  useLazyGetAllChromasQuery,
} = dataApi;
