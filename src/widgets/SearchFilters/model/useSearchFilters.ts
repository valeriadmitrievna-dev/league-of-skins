import { useGetChampionsQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import { checkSearch } from '@/shared/utils/checkSearch';
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import {
  filtersChampionIdSelector,
  filtersRaritySelector,
  filtersSelector,
  filtersSkinlineIdSelector,
  resetFilters,
  setFilterChampionId,
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

  const [championSearch, setChampionSearch] = useState("");
  const [skinlineSearch, setSkinlineSearch] = useState("");

  const { data } = useGetRaritiesQuery();
  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });
  const { data: skinlinesData, isLoading: isSkinlinesLoading, } = useGetSkinlinesQuery({ lang: i18n.language });

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skinlines } = getODataWithDefault(skinlinesData);

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
  };

  const searchChampionHandler = (value: string) => {
    setChampionSearch(value);
  };

  const searchSkinlineHandler = (value: string) => {
    setSkinlineSearch(value);
  };

  const changeChampionIdHandler = (value: string) => {
    if (value) dispatch(setFilterChampionId(value));
    else dispatch(setFilterChampionId(undefined));
  };

  const changeSkinlineIdHandler = (value: string) => {
    if (value) dispatch(setFilterSkinlineId(value));
    else dispatch(setFilterSkinlineId(undefined));
  };

  const changeRarityHandler = (value: string) => {
    if (value) dispatch(setFilterRarity(value));
    else dispatch(setFilterRarity(undefined));
  };

  return {
    rarities: data ?? [],
    champions: champions.filter(champion => checkSearch(champion.name, championSearch)),
    skinlines: skinlines.filter(skinline => checkSearch(skinline.name, skinlineSearch)),
    isChampionsLoading,
    isSkinlinesLoading,
    isFilters,
    championId,
    skinlineId,
    rarity,
    championSearch,
    skinlineSearch,
    searchChampionHandler,
    searchSkinlineHandler,
    changeChampionIdHandler,
    changeSkinlineIdHandler,
    changeRarityHandler,
    resetFiltersHandler,
  };
};

export default useSearchFilters;
