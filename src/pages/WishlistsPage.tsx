import { useGetWishlistsQuery } from "@/api";
import { Typography } from "@/components/Typography";
import { ChevronRightIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: wishlists = [] } = useGetWishlistsQuery();
  console.log("[DEV]", wishlists);

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
    </div>
  );
};

export default WishlistsPage;
