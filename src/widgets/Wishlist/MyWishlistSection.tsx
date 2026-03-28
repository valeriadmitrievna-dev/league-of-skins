import type { FC } from "react";

import { useGetWishlistsQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import EmptyWishlistsOwned from "@/emptystates/EmptyWishlistsOwned";
import WishlistCard from "@/widgets/Wishlist/WishlistCard";
import WishlistCreateModal from "@/widgets/Wishlist/WishlistCreateModal";

const MyWishlistsSection: FC = () => {
  const { data: ownedWishlists = [], isLoading: isOwnedWishlistsLoading } = useGetWishlistsQuery();

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <Typography.H3>Мои Вишлисты</Typography.H3>
        {ownedWishlists.length < 3 && !!ownedWishlists.length && <WishlistCreateModal />}
      </div>

      <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {isOwnedWishlistsLoading && !ownedWishlists.length && <Skeleton count={3} asChild className="h-64" />}

        {!isOwnedWishlistsLoading &&
          !!ownedWishlists.length &&
          ownedWishlists.map((wishlist) => <WishlistCard key={wishlist._id} data={wishlist} />)}

        {!isOwnedWishlistsLoading && !ownedWishlists.length && <EmptyWishlistsOwned className="col-span-full" />}
      </div>
    </section>
  );
};

export default MyWishlistsSection;
