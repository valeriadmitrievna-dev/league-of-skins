import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";

import { useGetUserQuery, useLazyGetAllChromasQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import Search from "@/components/Search";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import { appAuthSelector } from "@/store/app/app.selectors";
import { setChromasFound, setChromasLoading } from "@/store/app/app.slice";
import type { ChromaDto } from '@/types/chroma';
import ChromaCard from '@/widgets/ChromaCard';
import FiltersDrawer from "@/widgets/Filters/FiltersDrawer";
import SearchChromasFilters from "@/widgets/SearchChromasFilters";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

const SearchChromasPage: FC = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, {
    skip: !isAuth,
  });

  const { get, update } = useQueryParams();
  const search = get("search");

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

  const skinContentId = get("skinContentId");
  const championId = get("championId");
  const owned = get("owned");
  const skin = get("skin");

  const params = useMemo(
    () => ({
      lang: i18n.language,
      search: search || undefined,
      championId: championId || undefined,
      skinContentId: skinContentId || undefined,
      owned: owned || "all",
      skin: skin || "all",
    }),
    [i18n.language, search, championId, skinContentId, owned, skin],
  );

  const [getChromas, { isFetching }] = useLazyGetAllChromasQuery();

  const {
    items: chromas,
    loaderRef,
    isInitialLoadDone,
    isLoading,
    hasMore,
    totalCount,
  } = useInfiniteScroll({
    trigger: getChromas,
    initialParams: params,
  });
  const ownedSet = useMemo(() => new Set(user?.ownedChromas ?? []), [user?.ownedChromas]);

  const renderChroma = useCallback(
    (item: unknown, _index: number) => {
      const chroma = item as ChromaDto;
      const owned = ownedSet.has(chroma.contentId);

      return <ChromaCard data={chroma} owned={owned} addToWishlistButton toggleOwnedButton={Boolean(user)} />;
    },
    [user, ownedSet],
  );

  useEffect(() => {
    dispatch(setChromasFound(totalCount ?? 0));
  }, [totalCount]);

  useEffect(() => {
    dispatch(setChromasLoading(isLoading));
  }, [isLoading]);

  return (
    <>
      <CustomHead>
        <title>League of Skins | Skins Search</title>
        <meta name="description" content="Search for skins" />
      </CustomHead>

      <div className="w-full md:grid grid-cols-[280px_1fr] gap-6">
        <SearchChromasFilters className="hidden md:block" />

        <div className="pb-10">
          {/* <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>{t("shared.search")}</BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{t("header.chromas")}</BreadcrumbPage>
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

          {!isLoading && !isFetching && chromas?.length === 0 && isInitialLoadDone && <NoResultsState className="my-30" />}

          <VirtualizedGrid
            items={chromas}
            loading={!chromas.length && isLoading}
            fetching={isFetching}
            overscan={4}
            render={renderChroma}
            columnGap={16}
            rowGap={24}
          />
          {!!chromas && isFetching && <Spinner className="mx-auto mt-4 size-8" />}
          {hasMore && <div ref={loaderRef} />}

          <ScrollTop />
        </div>
      </div>
    </>
  );
};

export default SearchChromasPage;
