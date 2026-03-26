import { useEffect, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "react-use";

import { useGetWishlistsQuery, useLazySearchWishlistsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import Search from "@/components/Search";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import EmptyWishlistsOwned from '@/emptystates/EmptyWishlistsOwned';
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import WishlistCard from "@/widgets/Wishlist/WishlistCard";
import WishlistCreateModal from "@/widgets/Wishlist/WishlistCreateModal";

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: ownedWishlists = [], isLoading: isOwnedWishlistsLoading } = useGetWishlistsQuery();
  const [searchWishlists, { isFetching: isSearchFetching }] = useLazySearchWishlistsQuery();

  const { get, update } = useQueryParams();
  const search = get("search") ?? '';

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
    initialParams: { search },
    pageSize: 6,
    skip: !search.length,
  });

  useEffect(() => {
    if (!search.length) reset();
  }, [search]);

  return (
    <>
      <CustomHead>
        <title>League of Skins | Wishlists</title>
        <meta name="description" content="List of all your wishlists" />
      </CustomHead>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <Typography.H3>{t("header.wishlists")}</Typography.H3>
        {ownedWishlists.length < 3 && !!ownedWishlists.length && <WishlistCreateModal />}
      </div>

      <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {isOwnedWishlistsLoading && !ownedWishlists.length && <Skeleton count={3} asChild className="h-64" />}

        {!isOwnedWishlistsLoading &&
          !!ownedWishlists.length &&
          ownedWishlists.map((wishlist) => <WishlistCard key={wishlist._id} data={wishlist} />)}

        {!isOwnedWishlistsLoading && !ownedWishlists.length && (
          <EmptyWishlistsOwned className='col-span-full' />
        )}
      </div>

      <Typography.H3 className="mt-8 mb-4">Поиск вишлистов</Typography.H3>
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
    </>
  );
};

export default WishlistsPage;
