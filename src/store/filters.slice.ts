import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ChromaDto } from "./types";

export interface FiltersState {
  search: string;
  championId?: string;
  skinlineId?: string;
  rarity?: string;
  chroma?: ChromaDto;
}

const initialState: FiltersState = {
  search: "",
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
  },
});

export const { resetFilters, setFilterSearch, setFilterChampionId, setFilterSkinlineId, setFilterRarity, setFilterChroma } =
  filtersSlice.actions;

export default filtersSlice.reducer;
