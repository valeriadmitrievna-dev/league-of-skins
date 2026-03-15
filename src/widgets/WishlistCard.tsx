import { HeartIcon, Share2Icon, TrashIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { NavLink } from "react-router";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import useShare from "@/hooks/useShare";
import { cn } from "@/shared/utils/cn";
import type { WishlistDto } from "@/types/wishlist";

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
    <NavLink to={`/wishlists/${data._id}`} className="my-card px-4! flex flex-col justify-between">
      <Typography.Large>{data.name}</Typography.Large>

      <div className="mt-2 w-full flex items-center gap-2">
        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <HeartIcon className={cn("size-3", data.skins.length && "fill-muted-foreground")} />
          <Typography.Muted>{data.skins.length} items</Typography.Muted>
        </div>
        <Button size="icon" variant="outline" onClick={shareHandler} className="ml-auto">
          <Share2Icon />
        </Button>
        <Button size="icon" variant="outline">
          <TrashIcon />
        </Button>
      </div>
    </NavLink>
  );
};

export default WishlistCard;
