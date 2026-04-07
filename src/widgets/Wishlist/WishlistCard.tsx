import { LockIcon, LockOpenIcon, Share2Icon, TrashIcon, UserRoundIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { ImageStack } from "@/components/ImageStack";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useShare from "@/hooks/useShare";
import type { WishlistDto } from "@/types/wishlist";

import WishlistDeleteModal from "./WishlistDeleteModal";

interface WishlistCardProps {
  data: WishlistDto;
  guest?: boolean;
}

const WishlistCard: FC<WishlistCardProps> = ({ data, guest }) => {
  const { t } = useTranslation();
  const { share } = useShare();

  const shareHandler = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    share(
      { title: data.name, url: `${window.location.origin}/wishlists/${data.link}` },
      {
        error: "Ошибка при попытке поделиться",
      },
    );
  };

  return (
    <NavLink
      to={`/wishlists/${guest ? data.link : data._id}`}
      className="relative flex flex-col justify-between bg-card border rounded-md overflow-hidden group"
    >
      {!guest && (
        <Badge variant={data.private ? "destructive" : "default"} className="absolute z-5 top-2 left-2">
          {data.private ? <LockIcon /> : <LockOpenIcon />}
          {t(`wishlist.private_${data.private}`)}
        </Badge>
      )}

      <ImageStack images={(data.preview ?? []).map((i) => i ?? "")} className="bg-accent" />

      <div className="px-4 py-3 min-h-24 flex flex-col gap-y-2">
        <Typography.Large className="line-clamp-3">{data.name}</Typography.Large>

        <div className="mt-auto w-full flex items-end gap-2">
          <div className="flex items-center gap-2 mr-auto">
            {guest && (
              <Badge variant="secondary">
                <UserRoundIcon />
                {data.user.name}
              </Badge>
            )}
            {/* {!data.private && (
              <Badge variant="ghost" className="bg-foreground/20">
                <EyeIcon />
                {data.views > 999 ? "999+" : data.views}
              </Badge>
            )} */}
            <Typography.Muted>
              {data?.skins?.length > 999 ? "999+" : data?.skins?.length}{" "}
              {t("shared.skin", { count: data?.skins?.length > 999 ? 999 : data?.skins?.length })}
            </Typography.Muted>
            <Separator orientation="vertical" className="h-3!" />
            <Typography.Muted>
              {data?.chromas?.length > 999 ? "999+" : data?.chromas?.length}{" "}
              {t("shared.chroma", { count: data?.chromas?.length > 999 ? 999 : data?.chromas?.length })}
            </Typography.Muted>
          </div>
          {!data.private && !guest && (
            <Button size="icon" variant="outline" onClick={shareHandler}>
              <Share2Icon />
            </Button>
          )}
          {!guest && (
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
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default WishlistCard;
