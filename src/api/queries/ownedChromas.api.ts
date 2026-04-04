import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import type { UserDto } from "@/types/user";

import type { SkinsRequest, UpdateOwnedSkinsRequest } from "../types";
import { baseApi } from "./base.api";

export const ownedChromasApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOwnedChromas: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage<Omit<SkinsRequest, "owned">>>({
      query: ({ lang, ...params }) => ({
        url: "/users/owned/chromas",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
      providesTags: ["OwnedChromas"],
    }),
    updateOwnedChromas: build.mutation<UserDto, UpdateOwnedSkinsRequest>({
      query: (body) => ({
        url: "/users/owned/chromas",
        method: "put",
        body,
      }),
      invalidatesTags: ["User", "OwnedChromas", "Stats", "Wishlists"],
    }),
    // getOwnedSkinsStats: build.query<UserSkinsStatisticDto, WithLanguage>({
    //   query: ({ lang }) => ({
    //     url: "/users/owned/skins/stats",
    //     headers: { "App-Language": getLanguageCode(lang) },
    //   }),
    //   providesTags: ["Stats"],
    // }),
  }),
});

export const { useGetOwnedChromasQuery, useLazyGetOwnedChromasQuery, useUpdateOwnedChromasMutation } =
  ownedChromasApi;
