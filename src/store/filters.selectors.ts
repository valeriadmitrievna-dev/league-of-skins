import type { RootState } from "./store";

export const filtersSearchSelector = (state: RootState) => state.filters.search;
export const filtersRaritySelector = (state: RootState) => state.filters.rarity;
export const filtersChampionIdSelector = (state: RootState) => state.filters.championId;
export const filtersSkinlineIdSelector = (state: RootState) => state.filters.skinlineId;
export const filtersChromaSelector = (state: RootState) => state.filters.chroma;
export const filtersLegacySelector = (state: RootState) => state.filters.isLegacyEnabled;
export const filtersShowOwnedSelector = (state: RootState) => state.filters.isShowOwnedEnabled;

export const filtersSelector = (state: RootState) => {
  const championId = state.filters.championId;
  const skinlineId = state.filters.skinlineId;
  const rarity = state.filters.rarity;
  const chroma = state.filters.chroma;
  const isLegacyEnabled = state.filters.isLegacyEnabled;
  const isShowOwnedEnabled = state.filters.isShowOwnedEnabled;

  return !!championId || !!rarity || !!skinlineId || !!chroma || !isLegacyEnabled || !isShowOwnedEnabled;
};
