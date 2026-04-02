import { useEffect, useMemo, useState, type FC } from "react";
import { useDebounce } from 'react-use';

import { useLazySearchWishlistsQuery } from "@/api";
import NoResultsState from '@/components/NoResultsState';
import Search from '@/components/Search';
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useQueryParams } from '@/hooks/useQueryParams';

import WishlistCard from "./WishlistCard";


const WishlistsSectionSearch: FC = () => {
  const [searchWishlists, { isFetching: isSearchFetching }] = useLazySearchWishlistsQuery();
  const { get, update } = useQueryParams();
  const search = get("search") ?? "";

  const skinsQueryParams = useMemo(
    () => ({
      search: search,
    }),
    [search],
  );

  const [searchInput, setSearchInput] = useState(search ?? "");
  useDebounce(() => update("search", searchInput), 300, [searchInput]);

  const {
    items: resultWishlists,
    loaderRef,
    isInitialLoadDone,
    isLoading: isSearchLoading,
    hasMore,
    reset,
  } = useInfiniteScroll({
    trigger: searchWishlists,
    initialParams: skinsQueryParams,
    pageSize: 6,
    skip: !search.length,
  });

  useEffect(() => {
    if (!search.length) reset();
  }, [search]);

  return (
    <section className='p-4'>
      <Typography.H3 className="mb-4">Поиск вишлистов</Typography.H3>
      <Search placeholder="Поиск по имени пользователя (временно)" value={searchInput} onSearch={setSearchInput} />

      {!isSearchLoading && !isSearchFetching && resultWishlists?.length === 0 && isInitialLoadDone && (
        <NoResultsState className="my-30" />
      )}

      <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {resultWishlists.map((wishlist) => (
          <WishlistCard key={wishlist._id} data={wishlist} guest />
        ))}
        {isSearchLoading && <Skeleton count={6} asChild className="h-60" />}
      </div>

      {hasMore && <div ref={loaderRef} />}
    </section>
  );
};

export default WishlistsSectionSearch;
