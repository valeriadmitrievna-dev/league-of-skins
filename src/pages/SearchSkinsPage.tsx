import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { useGetChromasQuery, useGetUserQuery } from "@/api";
import { useGetSkins } from "@/api/hooks/useGetSkins";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { SkinDto } from "@/types/skin";
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
  const { i18n } = useTranslation();

  const { data: user } = useGetUserQuery();

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

  const { ref, data: skins, count, isLoading, isFetching } = useGetSkins(skinsQueryParams);

  const ownedSet = useMemo(() => new Set(user?.ownedSkins ?? []), [user?.ownedSkins]);

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      const owned = ownedSet.has(skin.contentId);

      return <SkinCard data={skin} owned={owned} navigatable addToWishlistButton toggleOwnedButton={Boolean(user)} />;
    },
    [user, ownedSet],
  );

  return (
    <>
      <CustomHead>
        <title>League of Skins | Skins Search</title>
        <meta name="description" content="Search for skins" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[300px_1fr] gap-5">
        <SearchSkinsBreadcrumb className="md:hidden mb-3" />
        <SearchFilters className="hidden md:block" />

        <div className="pb-10">
          <SearchSkinsBreadcrumb className="hidden md:block" />

          <div className="mt-3 mb-3 flex items-center gap-2">
            <Search value={searchInput} onSearch={setSearchInput} />
            <FiltersDrawer className="md:hidden" />
          </div>

          {/* {!!count && (
            <div className="flex items-center justify-between my-3">
              <Typography.Muted>
                <Typography.Small className="text-foreground!">{count}</Typography.Small>{" "}
                {t("shared.skin", { count: count })}
              </Typography.Muted>
              {!!count && (
                <AddToWishlist
                  skinContentIds={skins.map((skin) => skin.contentId)}
                  trigger={({ onOpen }) => (
                    <Button onClick={onOpen} size="sm">
                      <PlusIcon />
                      Добавить в вишлист
                    </Button>
                  )}
                />
              )}
            </div>
          )} */}

          {!isLoading && !isFetching && !count && <NoResultsState className="my-30" />}

          <VirtualizedGrid items={skins} loading={isLoading} fetching={isFetching} overscan={4} render={renderSkin} />
          {isFetching && <Spinner className="mx-auto mt-4 size-8" />}
          {!!skins && !isLoading && <div ref={ref} />}

          <ScrollTop />
        </div>
      </div>
    </>
  );
};

export default SearchSkinsPage;
