import type { ChromaDto } from '@/types/chroma';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  search: string;
  championId?: string;
  skinlineId?: string;
  rarity?: string;
  chroma?: ChromaDto;
  legacy: 'all' | 'on' | 'off';
  owned: 'all' | 'on' | 'off';
}

const initialState: FiltersState = {
  search: "",
  legacy: 'all',
  owned: 'all',
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (
      state,
      { payload }: PayloadAction<Omit<FiltersState, "search" | "legacy" | "owned">>,
    ) => {
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
      state.legacy = 'all';
      state.owned = 'all';
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
    setFilterLegacy: (state, { payload }: PayloadAction<string>) => {
      state.legacy = payload as FiltersState['legacy'];
    },
    setFilterOwned: (state, { payload }: PayloadAction<string>) => {
      state.owned = payload as FiltersState['owned'];
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
  setFilterOwned,
} = filtersSlice.actions;

export default filtersSlice.reducer;
