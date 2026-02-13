import { useGetSkinsQuery } from "@/api";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import {
  filtersChampionIdSelector,
  filtersChromaSelector,
  filtersLegacySelector,
  filtersRaritySelector,
  filtersSearchSelector,
  filtersSkinlineIdSelector,
  resetFilters,
  setFilterSearch,
} from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";

const useSearchPage = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [searchInput, setSearchInput] = useState("");

  const search = useSelector(filtersSearchSelector);
  const championId = useSelector(filtersChampionIdSelector);
  const skinlineId = useSelector(filtersSkinlineIdSelector);
  const rarity = useSelector(filtersRaritySelector);
  const chroma = useSelector(filtersChromaSelector);
  const isLegacyEnabled = useSelector(filtersLegacySelector);

  useDebounce(
    () => {
      dispatch(setFilterSearch(searchInput));
    },
    300,
    [searchInput],
  );

  const { data: skinsData, isLoading } = useGetSkinsQuery({
    lang: i18n.language,
    championId,
    skinlineId,
    search,
    rarity,
    colors: chroma?.colors,
    isLegacy: isLegacyEnabled,
  });
  const { data: skins, count } = getODataWithDefault(skinsData);

  const searchHandler = (value: string) => {
    setSearchInput(value);
  };

  const clearSearchHandler = () => {
    dispatch(setFilterSearch(""));
  };

  const fullResetHandler = () => {
    dispatch(resetFilters());
    dispatch(setFilterSearch(""));
  };

  return { skins, count, isLoading, searchInput, searchHandler, clearSearchHandler, fullResetHandler };
};

export default useSearchPage;
