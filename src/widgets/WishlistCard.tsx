import { Share2Icon, TrashIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { ImageStack } from "@/components/ImageStack";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import useShare from "@/hooks/useShare";
import type { WishlistDto } from "@/types/wishlist";

import WishlistDeleteModal from "./WishlistDeleteModal";

interface WishlistCardProps {
  data: WishlistDto;
}

const WishlistCard: FC<WishlistCardProps> = ({ data }) => {
  const { t } = useTranslation();
  const { share } = useShare();

  const shareHandler = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    share(
      { title: data.name, url: `${window.location.origin}/${data.link}` },
      {
        error: "Ошибка при попытке поделиться",
      },
    );
  };

  return (
    <NavLink
      to={`/wishlists/${data._id}`}
      className="flex flex-col justify-between bg-card border rounded-md overflow-hidden group"
    >
      <ImageStack images={(data.preview ?? []).map((i) => i ?? "")} />

      <div className="px-4 py-3">
        <Typography.Large className="line-clamp-3">{data.name}</Typography.Large>

        <div className="mt-2 w-full flex items-center gap-2">
          <Typography.Muted>
            {data.skins.length} {t("shared.skin", { count: data.skins.length })}
          </Typography.Muted>
          <Button size="icon" variant="outline" onClick={shareHandler} className="ml-auto">
            <Share2Icon />
          </Button>
          <WishlistDeleteModal
            wishlistId={data._id}
            trigger={({ onOpen }) => (
              <Button
                size="icon"
                variant="outline"
                onClick={onOpen}
                className="hover:bg-destructive hover:border-destructive dark:hover:border-destructive dark:hover:text-destructive"
              >
                <TrashIcon />
              </Button>
            )}
          />
        </div>
      </div>
    </NavLink>
  );
};

export default WishlistCard;
