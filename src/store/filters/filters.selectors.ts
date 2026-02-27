import type { RootState } from "../store";

export const filtersSearchSelector = (state: RootState) => state.filters.search;
export const filtersRaritySelector = (state: RootState) => state.filters.rarity;
export const filtersChampionIdSelector = (state: RootState) => state.filters.championId;
export const filtersSkinlineIdSelector = (state: RootState) => state.filters.skinlineId;
export const filtersChromaSelector = (state: RootState) => state.filters.chroma;
export const filtersLegacySelector = (state: RootState) => state.filters.legacy;
export const filtersOwnedSelector = (state: RootState) => state.filters.owned;

export const filtersSelector = (state: RootState) => {
  const championId = state.filters.championId;
  const skinlineId = state.filters.skinlineId;
  const rarity = state.filters.rarity;
  const chroma = state.filters.chroma;
  const legacyChanged = state.filters.legacy !== 'all';
  const ownedChanged = state.filters.owned !== 'all';

  return !!championId || !!rarity || !!skinlineId || !!chroma || legacyChanged || ownedChanged;
};
