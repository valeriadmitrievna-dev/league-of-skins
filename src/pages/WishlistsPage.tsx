import { useGetWishlistsQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import CreateWishlistModal from "@/widgets/CreateWishlistModal";
import { ChevronRightIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: wishlists = [], isFetching, isLoading } = useGetWishlistsQuery();
  console.log("[DEV]", wishlists);

  if (isFetching || isLoading) {
    return (
      <div className="flex flex-col gap-y-4 py-10 max-w-2xl m-auto">
        <Skeleton className="h-16" />
        <Skeleton className="h-16" />
        <Skeleton className="w-42 h-9 mx-auto" />
      </div>
    );
  }

  if (!isFetching && !wishlists?.length) {
    return (
      <section className="flex  flex-col items-center justify-center h-full">
        <Typography.H1 className="text-4xl font-bold">Oh oh! 🫣</Typography.H1>
        <Typography.P className="mt-2">{t("wishlist.no-wishlists-yet")}</Typography.P>

        <CreateWishlistModal buttonClassName="mt-5" />
      </section>
    );
  }

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
