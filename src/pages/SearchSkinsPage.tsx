import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";

import { useGetChromasQuery, useGetSkinsQuery } from "@/api";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useQueryParams } from "@/hooks/useQueryParams";
import { BREAKPOINTS } from "@/shared/constants/styles";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector } from "@/store";
import type { SkinDto } from "@/types/skin";
import SearchFilters from "@/widgets/SearchFilters";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

interface IBreadcrumbProps {
  className?: string;
}

const SearchSkinsBreadcrumb: FC<IBreadcrumbProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>{t("shared.search")}</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage>{t("header.skins")}</BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const SearchSkinsPage: FC = () => {
  const { i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);

  const { get, update } = useQueryParams();
  const search = get("search");
  const chromaId = get("chromaId");

  const [searchInput, setSearchInput] = useState(search ?? "");
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

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

  return (
    <div className="w-full md:grid grid-cols-[320px_1fr] gap-5">
      <SearchSkinsBreadcrumb className="md:hidden mb-3" />
      <SearchFilters className="md:sticky top-4" />

      <div className="pb-14">
        <SearchSkinsBreadcrumb className="hidden md:block" />

        <Search className="my-4 md:mt-3" value={searchInput} onSearch={setSearchInput} />

        {!isLoading && !skins.length && <NoResultsState className="my-30" />}

        <VirtualizedGrid
          items={skins}
          loading={isLoading}
          fetching={isFetching}
          gridClassName="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
          overscan={4}
          responsiveColumns={[
            { minWidth: BREAKPOINTS["2xl"], columns: 6 },
            { minWidth: BREAKPOINTS.xl, columns: 5 },
            { minWidth: BREAKPOINTS.lg, columns: 4 },
            { minWidth: BREAKPOINTS.md, columns: 3 },
            { minWidth: 0, columns: 2 },
          ]}
          render={renderSkin}
        />

        <ScrollTop />
      </div>
    </div>
  );
};

export default SearchSkinsPage;
