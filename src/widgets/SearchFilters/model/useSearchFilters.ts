import { useGetChampionsQuery } from "@/api";
import { filtersChampionIdSelector, setChampionId } from "@/store";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const useSearchFilters = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const championId = useSelector(filtersChampionIdSelector);
  const [championSearch, setChampionSearch] = useState("");

  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });

  const { data: champions } = useMemo(() => {
    if (championsData) {
      return {
        data: championsData.data.filter((champion) =>
          champion.name.trim().toLowerCase().includes(championSearch.trim().toLowerCase()),
        ),
        count: championsData.count,
      };
    } else return { count: 0, data: [] };
  }, [championsData, championSearch]);

  const searchChampionHandler = (value: string) => {
    setChampionSearch(value);
  };

  const changeChampionIdHandler = (value: string) => {
    if (value) dispatch(setChampionId(value));
    else dispatch(setChampionId(undefined));
  };

  return { champions, isChampionsLoading, championId, championSearch, changeChampionIdHandler, searchChampionHandler };
};

export default useSearchFilters;
