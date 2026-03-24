import { BadgeCheckIcon, HeartPlusIcon, SaveIcon, SaveOffIcon, Trash } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useUpdateOwnedSkinsMutation, useUpdateWishlistMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import type { SkinDto } from "@/types/skin";

import AddToWishlist from "./AddToWishlist";

interface SkinCardProps {
  className?: string;
  data: SkinDto;
  owned?: boolean | 'hidden';
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
  version = 2;
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
        className={cn("w-full h-full group select-none relative border flex flex-col overflow-hidden rounded-md", className)}
      >
        {/* Badges */}
        <div className="absolute top-0 start-0 end-0 p-2 z-3 flex gap-1 flex-wrap">
          {typeof owned === 'boolean' && owned && <Badge className="bg-success text-neutral-800">{t("skin.owned")}</Badge>}
          {data.rarity !== "kNoRarity" && (
            <Badge className="border-b border-s text-neutral-800" style={{ background: RARITIES[data.rarity]?.color }}>
              {t(`rarity.${data.rarity}`)}
            </Badge>
          )}
          {data.isLegacy && (
            <Badge variant="secondary" className="border-b border-s text-neutral-800">
              {t("rarity.legacy")}
            </Badge>
          )}
        </div>

        {/* Video preview */}
        {data.video && (data.video.card || data.video.centered) && (
          <video
            src={data.video.card ?? data.video.centered!}
            autoPlay
            muted
            loop
            className="absolute z-1 w-full h-full object-cover transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
          />
        )}

        <Image
          src={data.image.loading ?? ""}
          alt={data.name}
          className="relative object-cover w-full h-full transition-all scale-[1.05] group-hover:scale-[1.1]"
        />

        {/* Price */}
        <div className="hidden absolute bottom-36 left-0 right-0 p-2 flex items-center gap-x-2 w-full">
          <Separator className="shrink bg-neutral-200" style={{ background: RARITIES[data.rarity]?.color }} />
          <span
            className="bg-neutral-200 text-neutral-800 rounded-[4px] px-3 py-1 text-xs font-bold uppercase tracking-wide whitespace-nowrap"
            style={{ background: RARITIES[data.rarity]?.color }}
          >
            1350 RP
          </span>
          <Separator className="shrink bg-neutral-200" style={{ background: RARITIES[data.rarity]?.color }} />
        </div>

        {/* Info and actions */}
        <div className="absolute w-full h-36 bottom-0 left-0 right-0 z-2 p-4 bg-card flex flex-col gap-y-1 border-t">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{data.championName}</p>
          <p className="text-sm font-black text-foreground uppercase line-clamp-2 tracking-wide">{data.name}</p>

          {/* Chromas */}
          {!!data.chromas?.length && (
            <div className="flex items-center">
              {data.chromas.slice(0, 3).map((chroma) => (
                <ChromaColor key={chroma.id} colors={chroma.colors} className="size-5 not-last:-mr-2 border-neutral-950" />
              ))}
              {data.chromas.length > 3 && (
                <div className="size-5 aspect-square shrink-0 text-[10px] z-5 rounded-full text-neutral-50 bg-neutral-800 border-neutral-950 flex items-center justify-center">
                  +{data.chromas.length - 3}
                </div>
              )}
            </div>
          )}

          <div className="mt-auto w-full flex flex-col gap-y-2">
            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex items-stretch justify-end gap-x-2">
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
    <NavLink
      to={`/skins/${data.contentId}`}
      className={cn(
        "relative rounded-md flex border-2 w-full h-full p-0 overflow-hidden gap-y-4 group select-none",
        className,
      )}
      style={{ borderColor: RARITIES[data.rarity]?.color }}
    >
      {data.video && (data.video.card || data.video.centered) && (
        <video
          src={data.video.card || data.video.centered!}
          autoPlay
          muted
          loop
          className="absolute z-1 w-full h-full object-cover transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
        />
      )}
      <Image
        src={data.image.loading ?? ""}
        alt={data.name}
        className="relative w-full h-full object-cover origin-center scale-107"
      />
      <div className="absolute top-0 start-0 end-0 p-2 z-3 flex gap-1 justify-end flex-wrap">
        {data.isLegacy && <Badge variant="secondary">{t("rarity.legacy")}</Badge>}
        {data.rarity !== "kNoRarity" && (
          <Badge variant="secondary" className="text-neutral-900" style={{ background: RARITIES[data.rarity]?.color }}>
            {t(`rarity.${data.rarity}`)}
          </Badge>
        )}
        {owned && (
          <Badge variant="secondary" className="gap-x-1.5 bg-card text-card-foreground">
            <BadgeCheckIcon className="scale-120 text-blue-600 dark:text-blue-500" />
            <span>{t("skin.owned")}</span>
          </Badge>
        )}
      </div>
      {/* bg-linear-to-t from-neutral-950 to-transparent */}
      <div
        className="
          absolute size-full p-4 z-2 pointer-events-none
          bg-linear-to-t from-neutral-950 to-transparent
          flex flex-col gap-3 items-end justify-end text-right
          md:opacity-0 md:group-hover:opacity-100 transition-opacity
        "
      >
        <div className="flex flex-col gap-2 w-full text-neutral-50">
          <Typography.Muted className="font-medium text-neutral-50/50 uppercase tracking-widest leading-none">
            {data.championName}
          </Typography.Muted>
          <Typography.P className="font-medium">{data.name}</Typography.P>
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
                      <Button variant="outline" size="icon-lg" onClick={onOpen} className="pointer-events-auto">
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
      </div>
    </NavLink>
  );
};

export default SkinCard;
