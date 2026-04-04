import { getLanguageCode } from "@/shared/utils/getLanguageCode";
import type { ODataResponse, WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import type { UserDto } from "@/types/user";

import type { SkinsRequest, UpdateOwnedSkinsRequest } from "../types";
import { baseApi } from "./base.api";
import { userApi } from './user.api';

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
      async onQueryStarted({ addIds = [], removeIds = [] }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          userApi.util.updateQueryData("getUser", undefined, (draft) => {
            if (addIds.length) {
              draft.ownedChromas = [...draft.ownedChromas, ...addIds];
            }
            if (removeIds.length) {
              draft.ownedChromas = draft.ownedChromas.filter((id: string) => !removeIds.includes(id));
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
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

export const { useGetOwnedChromasQuery, useLazyGetOwnedChromasQuery, useUpdateOwnedChromasMutation } = ownedChromasApi;
