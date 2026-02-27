import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChromaDto } from "./types";

export interface FiltersState {
  search: string;
  championId?: string;
  skinlineId?: string;
  rarity?: string;
  chroma?: ChromaDto;
  isLegacyEnabled: boolean;
  isShowOwnedEnabled: boolean;
}

const initialState: FiltersState = {
  search: "",
  isLegacyEnabled: true,
  isShowOwnedEnabled: true,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, { payload }: PayloadAction<Omit<FiltersState, 'search' | 'isLegacyEnabled'>>) => {
      state.championId = payload.championId;
      state.skinlineId = payload.skinlineId;
      state.rarity = payload.rarity;
      state.chroma = payload.chroma;
    },
    resetFilters: (state) => {
      state.championId = undefined;
      state.skinlineId = undefined;
      state.rarity = undefined;
      state.chroma = undefined;
      state.isLegacyEnabled = true;
      state.isShowOwnedEnabled = true;
    },
    setFilterSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    setFilterChampionId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.championId = payload;
    },
    setFilterSkinlineId: (state, { payload }: PayloadAction<string | undefined>) => {
      state.skinlineId = payload;
    },
    setFilterRarity: (state, { payload }: PayloadAction<string | undefined>) => {
      state.rarity = payload;
    },
    setFilterChroma: (state, { payload }: PayloadAction<ChromaDto | undefined>) => {
      state.chroma = payload;
    },
    setFilterLegacy: (state, { payload }: PayloadAction<boolean>) => {
      state.isLegacyEnabled = payload;
    },
    setFilterShowOwned: (state, { payload }: PayloadAction<boolean>) => {
      state.isShowOwnedEnabled = payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setFilterSearch,
  setFilterChampionId,
  setFilterSkinlineId,
  setFilterRarity,
  setFilterChroma,
  setFilterLegacy,
  setFilterShowOwned,
} = filtersSlice.actions;

export default filtersSlice.reducer;
