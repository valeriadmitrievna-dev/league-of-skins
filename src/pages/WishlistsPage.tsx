import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetWishlistsQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import WishlistCard from "@/widgets/WishlistCard";
import WishlistCreateModal from "@/widgets/WishlistCreateModal";

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: wishlists = [], isLoading } = useGetWishlistsQuery();

  return (
    <>
      <CustomHead>
        <title>League of Skins | Wishlists</title>
        <meta name="description" content="List of all your wishlists" />
      </CustomHead>

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col gap-y-1">
          <Typography.H3>{t("header.wishlists")}</Typography.H3>
          <Typography.P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, sit!</Typography.P>
        </div>
        <WishlistCreateModal />
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {isLoading && !wishlists.length && <Skeleton count={6} asChild className="h-40" />}

        {!isLoading &&
          !!wishlists.length &&
          wishlists.map((wishlist) => <WishlistCard key={wishlist._id} data={wishlist} />)}
      </div>
    </>
  );
};

export default WishlistsPage;
