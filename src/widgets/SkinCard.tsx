import { BadgeCheckIcon, CheckIcon, HeartPlusIcon, SaveIcon, SaveOffIcon, Trash } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useUpdateOwnedSkinsMutation, useUpdateWishlistMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Typography } from '@/components/Typography';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/shared/utils/cn";
import type { SkinDto } from "@/types/skin";

import AddToWishlist from "./AddToWishlist";

interface SkinCardProps {
  className?: string;
  data: SkinDto;
  owned?: boolean;
  addToWishlistButton?: boolean;
  toggleOwnedButton?: boolean;
  wishlistId?: string;

  version?: number;
}

const SkinCard: FC<SkinCardProps> = ({
  className,
  data,
  owned,
  addToWishlistButton,
  toggleOwnedButton,
  wishlistId,
  version,
}) => {
  const { t } = useTranslation();

  const [updateOwnedSkins, { isLoading: isOwningUpdating }] = useUpdateOwnedSkinsMutation();
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const toggleOwnedHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (owned) updateOwnedSkins({ removeIds: [data.contentId] });
    else updateOwnedSkins({ addIds: [data.contentId] });
  };

  const removeFromWishlistHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (wishlistId) {
        await updateWishlist({ wishlistId, body: { removeIds: [data.contentId] } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (version === 2) {
    return (
      <NavLink
        to={`/skins/${data.contentId}`}
        className={cn("w-full group select-none relative border flex flex-col overflow-hidden rounded-md", className)}
      >
        {/* Badges */}
        <div className="absolute top-0 start-0 end-0 p-2 z-3 flex gap-1 justify-end flex-wrap">
          {data.isLegacy && <Badge className="border-b border-s">{t("rarity.legacy")}</Badge>}
          {data.rarity !== "kNoRarity" && <Badge className="border-b border-s">{t(`rarity.${data.rarity}`)}</Badge>}
          {owned && (
            <Badge variant="icon" className="bg-green-600 size-5.5 border-b border-s">
              <CheckIcon className="size-4!" />
            </Badge>
          )}
        </div>

        {/* Video preview */}
        {data.video && data.video.centered && (
          <video
            src={data.video.centered}
            autoPlay
            muted
            loop
            className="absolute z-1 aspect-square object-cover transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
          />
        )}

        <Image
          src={data.image.centered ?? ""}
          alt={data.name}
          className="relative object-cover aspect-square w-full transition-all group-hover:scale-[1.05]"
        />

        {/* Info and actions */}
        <div className="relative z-2 p-4 bg-card grow flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1 font-bold">{data.championName}</p>
          <p className="text-sm font-black text-foreground mb-2 uppercase line-clamp-2 tracking-wide">{data.name}</p>

          {/* Chromas */}
          {!!data.chromas?.length && (
            <div className="flex items-center my-2">
              {data.chromas.slice(0, 3).map((chroma) => (
                <ChromaColor key={chroma.id} colors={chroma.colors} className="size-5 not-last:-mr-2 border-neutral-950" />
              ))}
              {data.chromas.length > 3 && (
                <div className="size-5 aspect-square shrink-0 text-[10px] z-5 rounded-full bg-neutral-800 border-neutral-950 flex items-center justify-center">
                  +{data.chromas.length - 3}
                </div>
              )}
            </div>
          )}

          <div className="mt-auto w-full flex flex-col gap-y-2">
            {/* Price */}
            {/* <div className="flex items-center gap-x-2 w-full">
            <Separator className="shrink bg-primary" />
            <span className="block px-3 py-1 bg-primary text-xs font-bold uppercase tracking-wide whitespace-nowrap">
              1350 RP
            </span>
            <Separator className="shrink bg-primary" />
          </div> */}

            {/* Actions */}
            <div className="flex items-stretch justify-end gap-x-2">
              {toggleOwnedButton && (
                <Tooltip disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon-lg" onClick={toggleOwnedHandler} disabled={isOwningUpdating}>
                      {isOwningUpdating ? (
                        <Spinner className="size-5" />
                      ) : owned ? (
                        <SaveOffIcon className="size-5" />
                      ) : (
                        <SaveIcon className="size-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="pointer-events-none">
                    {owned ? t("skin.unmarkOwnedTooltip") : t("skin.markOwnedTooltip")}
                  </TooltipContent>
                </Tooltip>
              )}
              {addToWishlistButton && (
                <AddToWishlist
                  skinName={data.name}
                  skinContentIds={[data.contentId]}
                  trigger={({ onOpen }) => (
                    <Tooltip disableHoverableContent>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon-lg" onClick={onOpen}>
                          <HeartPlusIcon className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="pointer-events-none">{t("skin.add")}</TooltipContent>
                    </Tooltip>
                  )}
                />
              )}
              {wishlistId && (
                <Tooltip disableHoverableContent>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon-lg"
                      onClick={removeFromWishlistHandler}
                      disabled={isWishlistUpdating}
                    >
                      <Trash className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="pointer-events-none">{t("wishlist.removeFromWishlist")}</TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </NavLink>
    );
  }

  return (
    <Card className={cn("relative mx-auto w-full p-0 overflow-hidden gap-y-4 group select-none", className)}>
      {data.video && (data.video.card || data.video.centered) && (
        <video
          src={data.video.card || data.video.centered!}
          autoPlay
          muted
          loop
          className="absolute z-1 aspect-11/20 object-cover transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
        />
      )}
      <Image
        src={data.image.loading ?? ""}
        alt={data.name}
        className="relative aspect-11/20 w-full object-cover origin-center scale-107"
      />
      <div className="absolute top-0 start-0 end-0 p-2 z-3 flex gap-1 justify-end flex-wrap">
        {data.isLegacy && <Badge variant="secondary">{t("rarity.legacy")}</Badge>}
        {data.rarity !== "kNoRarity" && <Badge variant="secondary">{t(`rarity.${data.rarity}`)}</Badge>}
        {owned && (
          <Badge variant="secondary" className="gap-x-1.5">
            <BadgeCheckIcon className="scale-120 text-blue-600 dark:text-blue-500" />
            <span>{t("skin.owned")}</span>
          </Badge>
        )}
      </div>
      {/* bg-linear-to-t from-neutral-950 to-transparent */}
      <CardContent
        className="
          absolute size-full p-4 z-2 pointer-events-none
          bg-linear-to-t from-neutral-950 to-transparent
          flex flex-col gap-3 items-end justify-end text-right text-neutral-50
          md:opacity-0 md:group-hover:opacity-100 transition-opacity
        "
      >
        <div className="flex flex-col gap-1 w-full">
          <Typography.P className="font-medium text-sm">{data.name}</Typography.P>
          {!!data.chromas?.length && (
            <div className="flex items-center justify-end">
              {data.chromas.slice(0, 3).map((chroma) => (
                <ChromaColor key={chroma.id} colors={chroma.colors} className="size-5 not-last:-mr-2 border-neutral-950" />
              ))}
              {data.chromas.length > 3 && (
                <div className="h-full aspect-square shrink-0 text-[10px] z-5 rounded-full bg-neutral-800 flex items-center justify-center">
                  +{data.chromas.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
        {(addToWishlistButton || toggleOwnedButton) && (
          <div className="flex items-center gap-3">
            {toggleOwnedButton && (
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={toggleOwnedHandler}
                    className="pointer-events-auto"
                    disabled={isOwningUpdating}
                  >
                    {isOwningUpdating ? (
                      <Spinner className="size-5" />
                    ) : owned ? (
                      <SaveOffIcon className="size-5" />
                    ) : (
                      <SaveIcon className="size-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="pointer-events-none">
                  {owned ? t("skin.unmarkOwnedTooltip") : t("skin.markOwnedTooltip")}
                </TooltipContent>
              </Tooltip>
            )}
            {addToWishlistButton && (
              <AddToWishlist
                skinName={data.name}
                skinContentIds={[data.contentId]}
                trigger={({ onOpen }) => (
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-lg"
                        onClick={onOpen}
                        className="pointer-events-auto"
                      >
                        <HeartPlusIcon className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="pointer-events-none">{t("skin.add")}</TooltipContent>
                  </Tooltip>
                )}
              />
            )}
            {wishlistId && (
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={removeFromWishlistHandler}
                    className="pointer-events-auto"
                    disabled={isWishlistUpdating}
                  >
                    <Trash className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="pointer-events-none">{t("wishlist.removeFromWishlist")}</TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkinCard;
