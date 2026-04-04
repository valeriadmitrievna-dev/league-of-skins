import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { useLazyGetOwnedSkinsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import EmptyCollectionSkins from "@/emptystates/EmptyCollectionSkins";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import type { SkinDto } from "@/types/skin";
import CollectionSkinsStatistics from "@/widgets/CollectionSkinsStatistics";
import SkinCard from "@/widgets/SkinCard";
import { UploadInventory } from "@/widgets/UploadInventory";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

const CollectionSkinsPage: FC = () => {
  const { t, i18n } = useTranslation();

  const { get, update } = useQueryParams();
  const search = get("search");
  const chromaId = get("chromaId");

  const [searchInput, setSearchInput] = useState(search ?? "");
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

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
      chromaId: chromaId || undefined,
      legacy: legacy || "all",
    }),
    [i18n.language, search, chromaId, championId, skinlineId, rarity, legacy],
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
    return <SkinCard key={skin.id} data={skin} owned="hidden" addToWishlistButton toggleOwnedButton />;
  }, []);

  if (!isLoading && !ownedSkins.length && !search && isInitialLoadDone) {
    return <EmptyCollectionSkins />;
  }

  return (
    <>
      <CustomHead>
        <title>League of Skins | Collection</title>
        <meta name="description" content="Your skins collection" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[320px_1fr] gap-5">
        <CollectionSkinsStatistics />

        <div className="mt-8 md:mt-0">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>{t("header.collection")}</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{t("header.skins")}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <UploadInventory triggerClassName="hidden md:flex" />
          </div>

          <Search className="mb-4 mt-3 md:mt-2" value={searchInput} onSearch={setSearchInput} />

          {!isLoading && !isFetching && ownedSkins.length === 0 && isInitialLoadDone && <NoResultsState className="my-30" />}

          <VirtualizedGrid
            items={ownedSkins}
            loading={!ownedSkins.length && isLoading}
            fetching={isFetching}
            overscan={4}
            render={renderSkin}
            columnGap={16}
            rowGap={24}
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
