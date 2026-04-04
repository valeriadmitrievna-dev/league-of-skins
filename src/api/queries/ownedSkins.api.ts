import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import type { UserDto, UserSkinsStatisticDto } from "@/types/user";

import type { SkinsRequest, UpdateOwnedSkinsRequest } from "../types";
import { baseApi } from "./base.api";
import { userApi } from "./user.api";

export const ownedSkinsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOwnedSkins: build.query<ODataResponse<Omit<SkinDto, "skinlines">[]>, WithLanguage<Omit<SkinsRequest, "owned">>>({
      query: ({ lang, ...params }) => ({
        url: "/users/owned/skins",
        headers: { "App-Language": getLanguageCode(lang) },
        params,
      }),
      providesTags: ["OwnedSkins"],
    }),
    updateOwnedSkins: build.mutation<UserDto, UpdateOwnedSkinsRequest>({
      query: (body) => ({
        url: "/users/owned/skins",
        method: "put",
        body,
      }),
      async onQueryStarted({ addIds = [], removeIds = [] }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          userApi.util.updateQueryData("getUser", undefined, (draft) => {
            if (addIds.length) {
              draft.ownedSkins = [...draft.ownedSkins, ...addIds];
            }
            if (removeIds.length) {
              draft.ownedSkins = draft.ownedSkins.filter((id: string) => !removeIds.includes(id));
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["User", "OwnedSkins", "Stats", "Wishlists"],
    }),
    getOwnedSkinsStats: build.query<UserSkinsStatisticDto, WithLanguage>({
      query: ({ lang }) => ({
        url: "/users/owned/skins/stats",
        headers: { "App-Language": getLanguageCode(lang) },
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetOwnedSkinsQuery, useLazyGetOwnedSkinsQuery, useUpdateOwnedSkinsMutation, useGetOwnedSkinsStatsQuery } =
  ownedSkinsApi;
