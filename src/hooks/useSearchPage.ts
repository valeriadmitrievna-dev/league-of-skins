import { useGetSkinsQuery } from "@/api";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import {
  filtersChampionIdSelector,
  filtersChromaSelector,
  filtersLegacySelector,
  filtersOwnedSelector,
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
  const legacy = useSelector(filtersLegacySelector);
  const owned = useSelector(filtersOwnedSelector);

  useDebounce(() => dispatch(setFilterSearch(searchInput)), 300, [searchInput]);

  const { data: skinsData, isLoading } = useGetSkinsQuery({
    lang: i18n.language,
    ...(search ? { search } : {}),
    championId,
    skinlineId,
    rarity,
    chromaName: chroma?.name,
    chromaColors: getColorsString(chroma?.colors),
    legacy,
    owned,
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
    setSearchInput("");
  };

  return { skins, count, isLoading, searchInput, searchHandler, clearSearchHandler, fullResetHandler };
};

export default useSearchPage;
