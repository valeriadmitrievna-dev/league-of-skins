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
}

const initialState: FiltersState = {
  search: "",
  isLegacyEnabled: true,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.championId = undefined;
      state.skinlineId = undefined;
      state.rarity = undefined;
      state.chroma = undefined;
      state.isLegacyEnabled = true;
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
  },
});

export const {
  resetFilters,
  setFilterSearch,
  setFilterChampionId,
  setFilterSkinlineId,
  setFilterRarity,
  setFilterChroma,
  setFilterLegacy,
} = filtersSlice.actions;

export default filtersSlice.reducer;
