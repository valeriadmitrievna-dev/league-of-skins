import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import { checkSearch } from '@/shared/utils/checkSearch';
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import {
  filtersChampionIdSelector,
  filtersChromaSelector,
  filtersLegacySelector,
  filtersRaritySelector,
  filtersSelector,
  filtersSkinlineIdSelector,
  resetFilters,
  setFilterChampionId,
  setFilterChroma,
  setFilterLegacy,
  setFilterRarity,
  setFilterSkinlineId,
} from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const useSearchFilters = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const isFilters = useSelector(filtersSelector);
  const championId = useSelector(filtersChampionIdSelector);
  const skinlineId = useSelector(filtersSkinlineIdSelector);
  const rarity = useSelector(filtersRaritySelector);
  const chroma = useSelector(filtersChromaSelector);
  const isLegacyEnabled = useSelector(filtersLegacySelector);

  const [championSearch, setChampionSearch] = useState("");
  const [skinlineSearch, setSkinlineSearch] = useState("");
  const [chromaSearch, setChromaSearch] = useState("");

  const { data: raritiesData } = useGetRaritiesQuery();
  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });
  const { data: skinlinesData, isLoading: isSkinlinesLoading } = useGetSkinlinesQuery({ lang: i18n.language });
  const { data: chromasData, isLoading: isChromasLoading } = useGetChromasQuery({ lang: i18n.language });

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skinlines } = getODataWithDefault(skinlinesData);
  const { data: chromas } = getODataWithDefault(chromasData);
  const rarities = raritiesData ?? [];

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
  };

  const searchChampionHandler = (value: string) => {
    setChampionSearch(value);
  };

  const searchSkinlineHandler = (value: string) => {
    setSkinlineSearch(value);
  };

  const searchChromaHandler = (value: string) => {
    setChromaSearch(value);
  };

  const changeChampionIdHandler = (value: string) => {
    if (value) dispatch(setFilterChampionId(value));
    else dispatch(setFilterChampionId(undefined));
  };

  const clearChampionIdHandler = () => {
    dispatch(setFilterChampionId(undefined));
  };

  const changeSkinlineIdHandler = (value: string) => {
    if (value) dispatch(setFilterSkinlineId(value));
    else dispatch(setFilterSkinlineId(undefined));
  };

  const clearSkinlineIdHandler = () => {
    dispatch(setFilterSkinlineId(undefined));
  };

  const changeRarityHandler = (value: string) => {
    if (value) dispatch(setFilterRarity(value));
    else dispatch(setFilterRarity(undefined));
  };

  const clearRarityHandler = () => {
    dispatch(setFilterRarity(undefined));
  };

  const changeChromaHandler = (value: string) => {
    if (value) {
      const chroma = chromas.find(chroma => chroma.id === value);
      dispatch(setFilterChroma(chroma))
    }
    else dispatch(setFilterChroma(undefined));
  };

  const clearChromaHandler = () => {
    dispatch(setFilterChroma(undefined));
  };

  const toggleLegacyHandler = (value: boolean) => {
    dispatch(setFilterLegacy(value));
  }

  return {
    rarities,
    champions: champions.filter(champion => checkSearch(champion.name, championSearch)),
    skinlines: skinlines.filter(skinline => checkSearch(skinline.name, skinlineSearch)),
    chromas: chromas.filter(chroma => checkSearch(chroma.name, chromaSearch)),
    isLegacyEnabled,

    isChampionsLoading,
    isSkinlinesLoading,
    isChromasLoading,

    isFilters,

    championId,
    skinlineId,
    rarity,
    chroma,

    championSearch,
    skinlineSearch,
    chromaSearch,

    searchChampionHandler,
    searchSkinlineHandler,
    searchChromaHandler,

    changeChampionIdHandler,
    changeSkinlineIdHandler,
    changeRarityHandler,
    changeChromaHandler,
    toggleLegacyHandler,

    clearChampionIdHandler,
    clearSkinlineIdHandler,
    clearRarityHandler,
    clearChromaHandler,

    resetFiltersHandler,
  };
};

export default useSearchFilters;
