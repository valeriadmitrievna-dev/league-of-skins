import { Share2Icon, TrashIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import Image from "@/components/Image";
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
      className="my-card h-auto! p-0! flex flex-col justify-between bg-card border-primary/50!"
    >
      <div
        className="relative overflow-hidden h-40 bg-background grid"
        style={{ gridTemplateColumns: `repeat(${data.preview?.length ?? 1}, 1fr)` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-(--lol-navy-dark)/50 z-2" />
          {data.preview?.map((url, index) => {
            const total = data.preview?.length ?? 1;
            const part = 100 / (total - 1);

            return (
              <Image
                key={url}
                src={url ?? ""}
                className={cn("h-full object-cover absolute", {
                  "scale-150 -translate-x-[50%]": total > 1,
                  "w-full": total === 1,
                })}
                style={
                  total === 1
                    ? {}
                    : {
                        clipPath: "polygon(25% 0,100% 0,75% 100%,0 100%)",
                        width: `${part}%`,
                        left: `${index * part}%`,
                      }
                  }
              />
            );
          })}
        </div>

      <div className="px-4 py-3">
        <Typography.Large className="line-clamp-3">{data.name}</Typography.Large>

        <div className="mt-2 w-full flex items-center gap-2">
          <div className="flex items-center gap-1 text-muted-foreground mt-2">
            {/* <HeartIcon className={cn("size-3", { "fill-muted-foreground": data.skins.length })} /> */}
            <Typography.Muted>
              {data.skins.length} {t("shared.skin", { count: data.skins.length })}
            </Typography.Muted>
          </div>
          <Button size="icon" variant="lol-outline" onClick={shareHandler} className="ml-auto">
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
      </div>
    </NavLink>
  );
};

export default WishlistCard;
