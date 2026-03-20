import { CheckIcon, HeartPlusIcon, SaveIcon, SaveOffIcon, Trash } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useUpdateOwnedSkinsMutation, useUpdateWishlistMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}

const SkinCard: FC<SkinCardProps> = ({
  className,
  data,
  owned,
  addToWishlistButton,
  toggleOwnedButton,
  wishlistId,
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

  return (
    <NavLink
      to={`/skins/${data.contentId}`}
      className={cn(
        "w-full group select-none relative aspect-square clip-corner border-2 border-muted-foreground hover:border-primary flex flex-col overflow-hidden",
        className,
      )}
    >
      {/* Decor corners */}
      <div className="absolute z-5 size-3 bg-muted-foreground group-hover:bg-primary top-0 left-0 -translate-1/2" />
      <div className="absolute z-5 size-3 bg-muted-foreground group-hover:bg-primary bottom-0 right-0 translate-1/2" />

      {/* Badges */}
      <div className="absolute top-0 start-0 end-0 p-2 z-3 flex gap-1 justify-end flex-wrap">
        {data.isLegacy && <Badge className="border-b border-s border-(--lol-navy-dark)">{t("rarity.legacy")}</Badge>}
        {data.rarity !== "kNoRarity" && (
          <Badge className="border-b border-s border-(--lol-navy-dark)">{t(`rarity.${data.rarity}`)}</Badge>
        )}
        {owned && (
          <Badge variant="icon" className="bg-green-600 size-5.5 border-b border-s border-(--lol-navy-dark)">
            <CheckIcon className="size-4! text-(--lol-navy-dark)" />
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
            <span className="block px-3 py-1 bg-primary clip-corner-sm text-xs font-bold text-(--lol-navy-dark) uppercase tracking-wide whitespace-nowrap">
              1350 RP
            </span>
            <Separator className="shrink bg-primary" />
          </div> */}

          {/* Actions */}
          <div className="flex items-stretch justify-end gap-x-2">
            {toggleOwnedButton && (
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button variant="lol-outline" size="icon-lg" onClick={toggleOwnedHandler} disabled={isOwningUpdating}>
                    {isOwningUpdating ? (
                      <Spinner className="size-5" />
                    ) : owned ? (
                      <SaveOffIcon className="size-5 text-primary" />
                    ) : (
                      <SaveIcon className="size-5 text-primary" />
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
                        variant="lol-outline"
                        size="icon-lg"
                        onClick={onOpen}
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
                    variant="lol-outline"
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
};

export default SkinCard;
