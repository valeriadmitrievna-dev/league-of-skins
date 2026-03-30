import { HeartIcon } from "lucide-react";
import { useEffect, useMemo, useState, type FC } from "react";
import { useDebounce } from "react-use";

import { useLazySearchWishlistsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import NoResultsState from "@/components/NoResultsState";
import Search from "@/components/Search";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/shared/utils/cn";
import WishlistCard from "@/widgets/Wishlist/WishlistCard";
import WishlistsSectionOwned from "@/widgets/Wishlist/WishlistsSectionOwned";
import WishlistsSectionSubscribed from "@/widgets/Wishlist/WishlistsSectionSubscribed";

const WishlistsPage: FC = () => {
  const [searchWishlists, { isFetching: isSearchFetching }] = useLazySearchWishlistsQuery();

  const data = [
    { value: "my_wishlists", title: "Мои Вишлисты", content: WishlistsSectionOwned },
    { value: "subscriptions", icon: HeartIcon, title: "Подписки", content: WishlistsSectionSubscribed },
  ];

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
    <>
      <CustomHead>
        <title>League of Skins | Wishlists</title>
        <meta name="description" content="List of all your wishlists" />
      </CustomHead>

      <Tabs defaultValue="my_wishlists" className="gap-0">
        <TabsList variant="default" className="w-full">
          {data.map(({ icon: Icon, ...item }) => (
            <TabsTrigger
              key={item.value}
              className={cn(
                "p-2",
                "data-[state=active]:text-primary! data-[state=active]:bg-card!",
                "data-[state=active]:border-primary/50!",
              )}
              value={item.value}
            >
              {Icon && <Icon />}
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map(({ content: Content, ...item }) => (
          <TabsContent key={item.value} value={item.value} className="pt-4">
            <Content />
          </TabsContent>
        ))}
      </Tabs>

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
