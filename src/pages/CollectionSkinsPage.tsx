import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useDebounce } from "react-use";

import { useGetChromasQuery, useLazyGetOwnedSkinsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Typography } from "@/components/Typography";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/shared/utils/cn";
import { getColorsString } from "@/shared/utils/getColorsString";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { SkinDto } from "@/types/skin";
import CollectionSkinsStatistics from "@/widgets/CollectionSkinsStatistics";
import SkinCard from "@/widgets/SkinCard";
import { UploadInventory } from "@/widgets/UploadInventory";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

interface BreadcrumbsProps {
  className?: string;
}

const BreadcrumbsLine: FC<BreadcrumbsProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>{t("header.collection")}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>{t("header.skins")}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <UploadInventory triggerClassName="hidden md:flex" />
    </div>
  );
};

const CollectionSkinsPage: FC = () => {
  const { t, i18n } = useTranslation();

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

  const championId = get("championId");
  const skinlineId = get("skinlineId");
  const rarity = get("rarity");
  const legacy = get("legacy");

  const skinsQueryParams = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: championId || undefined,
      skinlineId: skinlineId || undefined,
      rarity: rarity || undefined,
      chromaName: chroma?.name,
      chromaColors: getColorsString(chroma?.colors),
      legacy: legacy || "all",
    }),
    [i18n.language, search, chroma, championId, skinlineId, rarity, legacy],
  );

  const [getSkins, { isFetching }] = useLazyGetOwnedSkinsQuery();
  const {
    items: ownedSkins,
    loaderRef,
    isInitialLoadDone,
    isLoading,
    hasMore,
  } = useInfiniteScroll({
    trigger: getSkins,
    initialParams: skinsQueryParams,
  });

  const renderSkin = useCallback((item: unknown, _index: number) => {
    const skin = item as SkinDto;
    return <SkinCard key={skin.id} data={skin} addToWishlistButton toggleOwnedButton />;
  }, []);

  if (!isLoading && !ownedSkins.length && !search && isInitialLoadDone) {
    return (
      <Empty className="w-full h-full max-h-120">
        <EmptyHeader>
          <EmptyTitle>{t("empty.collection-skins__title")}</EmptyTitle>
          <EmptyDescription>{t("empty.collection-skins__desc")}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="gap-y-1">
          <Button size="sm" asChild>
            <NavLink to="/search/skins">{t("empty.goto__search-skins")}</NavLink>
          </Button>
          <Typography.Muted>{t("shared.or")}</Typography.Muted>
          <UploadInventory />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      <CustomHead>
        <title>League of Skins | Collection</title>
        <meta name="description" content="Your skins collection" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[320px_1fr] gap-5">
        <BreadcrumbsLine className="md:hidden mb-8" />

        <CollectionSkinsStatistics />
        <div className="mt-8 md:mt-0">
          <BreadcrumbsLine className="hidden md:flex" />
          <Search className="mb-4 mt-3 md:mt-2" value={searchInput} onSearch={setSearchInput} />

          {!isLoading && !isFetching && ownedSkins.length === 0 && isInitialLoadDone && <NoResultsState className="my-30" />}

          <VirtualizedGrid
            items={ownedSkins}
            loading={!ownedSkins.length && isLoading}
            fetching={isFetching}
            overscan={4}
            render={renderSkin}
          />
          {!!ownedSkins && isFetching && <Spinner className="mx-auto mt-4 size-8" />}
          {hasMore && <div ref={loaderRef} />}

          <ScrollTop />
        </div>
      </div>
    </>
  );
};

export default CollectionSkinsPage;
