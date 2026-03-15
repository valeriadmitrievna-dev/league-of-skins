import { HeartIcon, Share2Icon, TrashIcon } from "lucide-react";
import type { FC } from "react";
import { NavLink } from "react-router";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import useShare from '@/hooks/useShare';
import type { WishlistDto } from "@/types/wishlist";


interface WishlistCardProps {
  data: WishlistDto;
}

const WishlistCard: FC<WishlistCardProps> = ({ data }) => {
  const { share } = useShare();

  const shareHandler = () => {
    share({ title: data.name, url: `${window.location.origin}/${data.link}` }, {
      error: 'Ошибка при попытке поделиться'
    })
  }

  return (
    <div className="my-card px-4! flex flex-col justify-between">
      <div>
        <Typography.Large>{data.name}</Typography.Large>
        <Typography.Muted className="line-clamp-2 mt-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat, tenetur.
        </Typography.Muted>
        <div className="flex items-center gap-1 text-muted-foreground mt-2">
          <HeartIcon className="size-3" />
          <Typography.Muted>{data.skins.length} items</Typography.Muted>
        </div>
      </div>

      <div className="mt-2 w-full flex items-center gap-2">
        <Button className="grow" asChild>
          <NavLink to={`/wishlists/${data._id}`}>Open</NavLink>
        </Button>
        <Button size="icon" variant="outline" onClick={shareHandler}>
          <Share2Icon />
        </Button>
        <Button size="icon" variant="outline">
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default WishlistCard;
