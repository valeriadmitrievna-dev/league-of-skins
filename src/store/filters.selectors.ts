import type { RootState } from "./store";

export const filtersSearchSelector = (state: RootState) => state.filters.search;
export const filtersRaritySelector = (state: RootState) => state.filters.rarity;
export const filtersChampionIdSelector = (state: RootState) => state.filters.championId;
export const filtersSkinlineIdSelector = (state: RootState) => state.filters.skinlineId;

export const filtersSelector = (state: RootState) => {
  const championId = state.filters.championId;
  const skinlineId = state.filters.skinlineId;
  const rarity = state.filters.rarity;

  return !!championId || !!rarity || !!skinlineId;
};
