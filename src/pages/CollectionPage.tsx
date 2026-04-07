import { useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { useGetCollectionStatsQuery, useLazyGetOwnedSkinsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Typography } from '@/components/Typography';
import EmptyCollectionSkins from "@/emptystates/EmptyCollectionSkins";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import CollectionCounts from "@/widgets/Collection/CollectionCounts";
import CollectionFilters from "@/widgets/Collection/CollectionFilters";
import CollectionRarities from "@/widgets/Collection/CollectionRarities";
import CollectionSearch from "@/widgets/Collection/CollectionSearch";
import CollectionSkins from "@/widgets/Collection/CollectionSkins";
import CollectionTop from "@/widgets/Collection/CollectionTop";
import CollectionWasted from "@/widgets/Collection/CollectionWasted";

const CollectionPage: FC = () => {
  const { t, i18n } = useTranslation();

  const { get, update } = useQueryParams();
  const search = get("search");
  const chromaId = get("chromaId");

  const [searchInput, setSearchInput] = useState(search ?? "");
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

  const championId = get("championId");
  const skinlineId = get("skinlineId");
  const rarity = get("rarity");

  const { data: statistic, isLoading: isStatisticLoading } = useGetCollectionStatsQuery({ lang: i18n.language });
  const [getSkins, { isFetching }] = useLazyGetOwnedSkinsQuery();

  const params = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: championId || undefined,
      skinlineId: skinlineId || undefined,
      rarity: rarity || undefined,
      chromaId: chromaId || undefined,
      legacy: "all",
    }),
    [i18n.language, search, championId, skinlineId, rarity, chromaId],
  );

  const {
    items: ownedSkins,
    loaderRef,
    isInitialLoadDone,
    isLoading,
    hasMore,
  } = useInfiniteScroll({
    trigger: getSkins,
    initialParams: params,
  });

  if (!isLoading && !ownedSkins.length && !search && isInitialLoadDone) {
    return <EmptyCollectionSkins />;
  }

  return (
    <>
      <CustomHead>
        <title>League of Skins | Collection</title>
        <meta name="description" content="Your skins collection" />
      </CustomHead>

      <div className="w-full grid grid-cols-[280px_1fr] gap-x-5 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <CollectionTop data={statistic?.top.champions} loading={isStatisticLoading} />
          <CollectionCounts data={statistic?.user} totals={statistic?.totals} loading={isStatisticLoading} />
          <CollectionWasted
            skinsPrice={statistic?.user.value.skins ?? 0}
            chromasPrice={statistic?.user.value.chromas ?? 0}
            withHint
          />
          <CollectionRarities data={statistic?.distribution.byRarity} />
          <Typography.Muted>* {t("skin.priceHelperFull")}</Typography.Muted>
        </div>
        {/* <CollectionFilters
          get={get}
          update={update}
          data={statistic?.distribution}
          loading={isStatisticLoading}
          fetching={isLoading}
          className="col-1"
        /> */}
        <div>
          <CollectionSearch value={searchInput} onSearch={setSearchInput} disabled={isLoading || isFetching} className="mb-2" />
          <CollectionFilters
            get={get}
            update={update}
            data={statistic?.distribution}
            loading={isStatisticLoading}
            fetching={isLoading}
            className='mb-4'
          />
          <CollectionSkins
            data={ownedSkins}
            loading={isLoading}
            fetching={isFetching}
            initialLoadDone={isInitialLoadDone}
            loaderRef={loaderRef}
            hasMore={hasMore}
          />
        </div>
      </div>

      {/* <div className="w-full md:grid grid-cols-[320px_1fr] gap-5">
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
          </div>

          <ButtonGroup className="w-full mb-4 mt-3 md:mt-2">
            <ButtonGroup className="flex-1">
              <Search value={searchInput} onSearch={setSearchInput} />
            </ButtonGroup>
            <ButtonGroup>
              <UploadInventory className="h-auto px-5! hidden md:flex" />
            </ButtonGroup>
          </ButtonGroup>

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
      </div> */}
    </>
  );
};

export default CollectionPage;
