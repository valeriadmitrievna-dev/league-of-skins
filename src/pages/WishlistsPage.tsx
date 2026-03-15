import { ChevronRightIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useGetWishlistsQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import CreateWishlistModal from "@/widgets/CreateWishlistModal";
import WishlistCard from '@/widgets/WishlistCard';

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: wishlists = [], isLoading } = useGetWishlistsQuery();

  return (
    <div className='mx-auto max-w-8xl'>
      <div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex flex-col gap-y-1'>
          <Typography.H3>{t("header.wishlists")}</Typography.H3>
          <Typography.P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, sit!</Typography.P>
        </div>
        <CreateWishlistModal />
      </div>

      <div className='mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {isLoading && !wishlists.length && (
          <Skeleton count={6} asChild className='h-40' />
        )}

        {!isLoading && !!wishlists.length && wishlists.map(wishlist => (
          <WishlistCard key={wishlist._id} data={wishlist} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4 py-10 max-w-2xl m-auto">
      {wishlists.map((wishlist) => (
        <NavLink
          key={wishlist._id}
          to={`/wishlists/${wishlist._id}`}
          className="rounded-md border px-5 py-4 flex items-center justify-between gap-x-4"
        >
          <Typography.Large>{wishlist.name === "__MAIN__" ? t("wishlist.__MAIN__") : wishlist.name}</Typography.Large>
          <ChevronRightIcon className="text-muted-foreground shrink-0" />
        </NavLink>
      ))}

      <CreateWishlistModal buttonClassName="mx-auto" />
    </div>
  );
};

export default WishlistsPage;
