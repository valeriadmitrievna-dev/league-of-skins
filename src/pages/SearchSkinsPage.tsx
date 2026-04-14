import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";

import { useGetUserQuery, useLazyGetSkinsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import { appAuthSelector } from "@/store/app/app.selectors";
import { setSkinsFound, setSkinsLoading } from "@/store/app/app.slice";
import type { SkinDto } from "@/types/skin";
import FiltersDrawer from "@/widgets/Filters/FiltersDrawer";
import SearchSkinsFilters from "@/widgets/SearchSkinsFilters";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

const SearchSkinsPage: FC = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, {
    skip: !isAuth,
  });

  const { get, update } = useQueryParams();
  const search = get("search");
  const chromaId = get("chromaId");

  const [searchInput, setSearchInput] = useState(search ?? "");
  useDebounce(
    () => {
      if (searchInput !== (search ?? "")) {
        update("search", searchInput);
      }
    },
    300,
    [searchInput, search],
  );

  const championId = get("championId");
  const skinlineId = get("skinlineId");
  const rarity = get("rarity");
  const legacy = get("legacy");
  const owned = get("owned");
  const server = get("server");

  const skinsQueryParams = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: championId || undefined,
      skinlineId: skinlineId || undefined,
      rarity: rarity || undefined,
      chromaId: chromaId || undefined,
      legacy: legacy || "all",
      owned: owned || "all",
      server: server || "all",
    }),
    [i18n.language, search, championId, skinlineId, chromaId, rarity, legacy, owned, server],
  );

  const [getSkins, { isFetching }] = useLazyGetSkinsQuery();

  const {
    items: skins,
    loaderRef,
    isInitialLoadDone,
    isLoading,
    hasMore,
    totalCount,
  } = useInfiniteScroll({
    trigger: getSkins,
    initialParams: skinsQueryParams,
  });
  const ownedSet = useMemo(() => new Set(user?.ownedSkins ?? []), [user?.ownedSkins]);

  const renderSkin = useCallback(
    (item: unknown, _index: number) => {
      const skin = item as SkinDto;
      const owned = ownedSet.has(skin.contentId);

      return <SkinCard data={skin} owned={owned} addToWishlistButton toggleOwnedButton={Boolean(user)} />;
    },
    [user, ownedSet],
  );

  useEffect(() => {
    dispatch(setSkinsFound(totalCount ?? 0));
  }, [totalCount]);

  useEffect(() => {
    dispatch(setSkinsLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <CustomHead>
        <title>League of Skins | Skins Search</title>
        <meta name="description" content="Search for skins" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[280px_1fr] gap-6">
        <SearchSkinsFilters className="hidden md:block" />

        <div className="pb-10">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{t("shared.search")}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{t("header.skins")}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb> */}

          <div className="mb-4 flex items-center gap-2">
            <Search value={searchInput} onSearch={setSearchInput} />
            <FiltersDrawer className="md:hidden" />
          </div>

          {/* {!!count && (
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
          )} */}

          {!isLoading && !isFetching && skins?.length === 0 && isInitialLoadDone && <NoResultsState className="my-30" />}

          <VirtualizedGrid
            items={skins}
            loading={!skins.length && isLoading}
            fetching={isFetching}
            overscan={4}
            render={renderSkin}
            columnGap={16}
            rowGap={24}
          />
          {!!skins && isFetching && <Spinner className="mx-auto mt-4 size-8" />}
          {hasMore && <div ref={loaderRef} />}

          <ScrollTop />
        </div>
      </div>
    </>
  );
};

export default SearchSkinsPage;
