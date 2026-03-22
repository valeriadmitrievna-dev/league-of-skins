import { PlusIcon } from "lucide-react";
import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDebounce } from "react-use";

import { useGetChromasQuery, useGetSkinsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector } from "@/store";
import type { SkinDto } from "@/types/skin";
import AddToWishlist from "@/widgets/AddToWishlist";
import FiltersDrawer from "@/widgets/Filters/FiltersDrawer";
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
  const { t, i18n } = useTranslation();

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
  const { data: skins, count: skinsCount } = getODataWithDefault(skinsData);

  const renderSkin = useCallback(
    (item: unknown, _index: number, className?: string) => {
      const skin = item as SkinDto;
      return (
        <SkinCard
          key={skin.id}
          data={skin}
          owned={skin.owned}
          className={className}
          addToWishlistButton
          toggleOwnedButton={isAuth}
        />
      );
    },
    [isAuth],
  );

  return (
    <>
      <CustomHead>
        <title>League of Skins | Skins Search</title>
        <meta name="description" content="Search for skins" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[320px_1fr] gap-5">
        <SearchSkinsBreadcrumb className="md:hidden mb-3" />
        <SearchFilters className="hidden md:block" />

        <div className="pb-14">
          <SearchSkinsBreadcrumb className="hidden md:block" />

          <div className="mt-3 mb-3 flex items-center gap-2">
            <Search value={searchInput} onSearch={setSearchInput} />
            <FiltersDrawer className="md:hidden" />
          </div>

          {!!skinsCount && (
            <div className="flex items-center justify-between my-3">
              <span className='text-muted-foreground tracking-wide'>
                {t("filters.found_count")}{" "}
                <span className="text-primary text-glow-gold font-bold">{skinsCount}</span>{" "}
                {t("shared.skin", { count: skinsCount })}
              </span>
              {!!skinsCount && (
                <AddToWishlist
                  skinContentIds={skins.map((skin) => skin.contentId)}
                  trigger={({ onOpen }) => (
                    <Button onClick={onOpen}>
                      <PlusIcon />
                      Добавить в вишлист
                    </Button>
                  )}
                />
              )}
            </div>
          )}

          {!isLoading && !skins.length && <NoResultsState className="my-30" />}

          <VirtualizedGrid items={skins} loading={isLoading} fetching={isFetching} overscan={4} render={renderSkin} />

          <ScrollTop />
        </div>
      </div>
    </>
  );
};

export default SearchSkinsPage;
