import type { FC } from "react";

import { useGetSubscribedWishlistsQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import EmptyWishlistsSubscribed from "@/emptystates/EmptyWishlistsSubscribed";

import WishlistCard from "./WishlistCard";

const WishlistsSectionSubscribed: FC = () => {
  const { data: subscribedWishlists = [], isLoading: isWishlistsLoading } = useGetSubscribedWishlistsQuery();

  return (
    <section>
      <Typography.H3>Подписки</Typography.H3>

      <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {isWishlistsLoading && !subscribedWishlists.length && <Skeleton count={3} asChild className="h-64" />}

        {!isWishlistsLoading &&
          !!subscribedWishlists.length &&
          subscribedWishlists.map((wishlist) => <WishlistCard key={wishlist._id} data={wishlist} guest />)}

        {!isWishlistsLoading && !subscribedWishlists.length && <EmptyWishlistsSubscribed className="col-span-full" />}
      </div>
    </section>
  );
};

export default WishlistsSectionSubscribed;
