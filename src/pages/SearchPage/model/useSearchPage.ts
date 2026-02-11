import { useGetSkinsQuery } from "@/api";
import { filtersChampionIdSelector, filtersSearchSelector, setSearch } from "@/store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from 'react-use';

const useSearchPage = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const [searchInput, setSearchInput] = useState('');

  const search = useSelector(filtersSearchSelector);
  const championId = useSelector(filtersChampionIdSelector);

  useDebounce(() => {
    dispatch(setSearch(searchInput));
  }, 300, [searchInput]);

  const { data } = useGetSkinsQuery({ lang: i18n.language, championId, search });

  const searchHandler = (value: string) => {
    setSearchInput(value)
  };

  const clearSearchHandler = () => {
    dispatch(setSearch(""));
  };

  const { data: skins, count } = useMemo(() => {
    if (data) return { data: data.data, count: data.count };
    else return { data: [], count: 0 };
  }, [data]);

  return { skins: skins.slice(0, 20), count, searchInput, searchHandler, clearSearchHandler };
};

export default useSearchPage;
