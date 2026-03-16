import { HeartIcon, Share2Icon, TrashIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { NavLink } from "react-router";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import useShare from "@/hooks/useShare";
import { cn } from "@/shared/utils/cn";
import type { WishlistDto } from "@/types/wishlist";

import WishlistDeleteModal from "./WishlistDeleteModal";

interface WishlistCardProps {
  data: WishlistDto;
}

const WishlistCard: FC<WishlistCardProps> = ({ data }) => {
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
    <NavLink to={`/wishlists/${data._id}`} className="my-card h-auto! px-4! flex flex-col justify-between">
      <Typography.Large className="line-clamp-3">{data.name}</Typography.Large>

      <div className="mt-2 w-full flex items-center gap-2">
        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <HeartIcon className={cn("size-3", { "fill-muted-foreground": data.skins.length })} />
          <Typography.Muted>{data.skins.length} items</Typography.Muted>
        </div>
        <Button size="icon" variant="outline" onClick={shareHandler} className="ml-auto">
          <Share2Icon />
        </Button>
        <WishlistDeleteModal
          wishlistId={data._id}
          trigger={({ onOpen }) => (
            <Button size="icon" variant="outline" onClick={onOpen}>
              <TrashIcon />
            </Button>
          )}
        />
      </div>
    </NavLink>
  );
};

export default WishlistCard;
