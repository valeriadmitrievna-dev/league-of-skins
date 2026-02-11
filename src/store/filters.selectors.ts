import type { RootState } from "./store";

export const filtersSearchSelector = (state: RootState) => state.filters.search;
export const filtersChampionIdSelector = (state: RootState) => state.filters.championId;
