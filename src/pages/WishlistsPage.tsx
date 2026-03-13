import { useGetWishlistsQuery } from "@/api";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

const WishlistsPage: FC = () => {
  const { t } = useTranslation();
  const { data: wishlists = [] } = useGetWishlistsQuery();
  console.log("[DEV]", wishlists);

  if (!wishlists?.length) {
    return (
      <section className="flex  flex-col items-center justify-center h-full">
        <Typography.H1 className="text-4xl font-bold">Oh oh! 🫣</Typography.H1>
        <Typography.P className="mt-2">{t("wishlist.no-wishlists-yet")}</Typography.P>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-5">{t("wishlist.create-new-wishlist")}</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-sm! overflow-hidden">
            <div className="flex flex-col justify-center">
              <Typography.P>New Wishlist</Typography.P>
              <Input className="mt-3" placeholder={t("wishlist.enter-wishlist-name")} />
              <Button className="mt-4">{t("wishlist.create-wishlist")}</Button>
            </div>
          </DialogContent>
        </Dialog>
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
    </div>
  );
};

export default WishlistsPage;
