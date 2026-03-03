import { useGetChromasQuery, useGetSkinsQuery } from "@/api";
import Search from "@/components/Search";
import { useQueryParams } from "@/hooks/useQueryParams";
import { BREAKPOINTS } from "@/shared/constants/styles";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector } from "@/store";
import type { SkinDto } from "@/types/skin";
import SearchFilters from "@/widgets/SearchFilters";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";

const SearchSkinsPage: FC = () => {
  const { i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const [searchInput, setSearchInput] = useState("");

  const { get, update } = useQueryParams();
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

  const search = get("search");
  const chromaId = get("chromaId");

  const { data: chromasData } = useGetChromasQuery({ lang: i18n.language });
  const { data: chromas } = getODataWithDefault(chromasData);

  const chroma = useMemo(() => {
    return chromas.find((chroma) => chroma.id === chromaId);
  }, [chromaId, chromas]);

  const skinsQueryParams = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: get("championId") || undefined,
      skinlineId: get("skinlineId") || undefined,
      rarity: get("rarity") || undefined,
      chromaName: chroma?.name,
      chromaColors: getColorsString(chroma?.colors),
      legacy: get("legacy") || "all",
      owned: get("owned") || "all",
    }),
    [i18n.language, search, chroma, get],
  );

  const { data: skinsData, isLoading, isFetching } = useGetSkinsQuery(skinsQueryParams);
  const { data: skins } = getODataWithDefault(skinsData);

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      return <SkinCard key={skin.id} data={skin} navigatable addToWishlistButton toggleOwnedButton={isAuth} />;
    },
    [isAuth],
  );

  useEffect(() => {
    if (search !== searchInput) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchInput(search ?? "");
    }
  }, [search]);

  return (
    <div className="w-full grid grid-cols-[320px_1fr] gap-5">
      <SearchFilters />
      <div>
        <Search className="mb-4" value={searchInput} onSearch={setSearchInput} />
        <VirtualizedGrid
          items={skins}
          loading={isLoading}
          fetching={isFetching}
          gridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          overscan={2}
          responsiveColumns={[
            { minWidth: BREAKPOINTS.xl, columns: 5 },
            { minWidth: BREAKPOINTS.lg, columns: 4 },
            { minWidth: BREAKPOINTS.md, columns: 3 },
            { minWidth: 0, columns: 2 },
          ]}
          render={renderSkin}
        />
      </div>
    </div>
  );
};

export default SearchSkinsPage;
