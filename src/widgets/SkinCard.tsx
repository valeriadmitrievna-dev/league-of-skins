import { BookmarkIcon, HeartIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { useUpdateOwnedSkinsMutation, useUpdateWishlistMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import type { SkinDto } from "@/types/skin";

import AddToWishlist from "./AddToWishlist";

interface SkinCardProps {
  className?: string;
  data: SkinDto;
  owned?: boolean | "hidden";
  addToWishlistButton?: boolean;
  toggleOwnedButton?: boolean;
  wishlistId?: string;
}

const SkinCard: FC<SkinCardProps> = ({ className, data, owned, addToWishlistButton, toggleOwnedButton, wishlistId }) => {
  const { t } = useTranslation();

  const [updateOwnedSkins, { isLoading: isOwningUpdating }] = useUpdateOwnedSkinsMutation();
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const toggleOwnedHandler = () => {
    if (owned) updateOwnedSkins({ removeIds: [data.contentId] });
    else updateOwnedSkins({ addIds: [data.contentId] });
  };

  const removeFromWishlistHandler = async () => {
    try {
      if (wishlistId) {
        await updateWishlist({ wishlistId, body: { removeIds: [data.contentId] } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={cn(
        "h-full flex flex-col",
        {
          "pointer-events-none animate-pulse": isWishlistUpdating || isOwningUpdating,
        },
        className,
      )}
    >
      <NavLink to={`/skins/${data.contentId}`} className="block relative group aspect-[1/1.2] rounded-md overflow-hidden">
        <Image src={data.image.centered ?? ""} className="object-cover size-full transition-all group-hover:scale-[1.1]" />

        {/* Video preview */}
        {data.video && data.video.centered && (
          <video
            src={data.video.centered}
            autoPlay
            muted
            loop
            className="absolute z-1 top-0 left-0 size-full object-cover transition-opacity opacity-0 group-hover:opacity-100 pointer-events-none"
          />
        )}

        {data.rarity !== "kNoRarity" && (
          <Badge
            className="absolute z-2 top-1.5 left-1.5 border-b border-s text-neutral-800"
            style={{ background: RARITIES[data.rarity]?.color }}
          >
            {t(`rarity.${data.rarity}`)}
          </Badge>
        )}

        {!!data.chromas.length && (
          <div className="flex items-center flex-wrap absolute left-1.5 bottom-1.5 z-2">
            {data.chromas.slice(0, 3).map((chroma) => (
              <ChromaColor key={chroma.id} colors={chroma.colors} className="size-5 rounded-sm not-last:-mr-2 border-none" />
            ))}
            {data.chromas.length > 3 && (
              <div className="size-5 aspect-square shrink-0 text-[10px] z-5 rounded-sm text-neutral-50 bg-neutral-800 flex items-center justify-center">
                +{data.chromas.length - 3}
              </div>
            )}
          </div>
        )}
      </NavLink>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium mr-auto">{data.championName}</span>
        {toggleOwnedButton &&
          (isOwningUpdating ? (
            <Spinner className="size-5 my-1 mr-0.5 text-primary shrink-0" />
          ) : (
            <BookmarkIcon
              onClick={toggleOwnedHandler}
              className={cn("size-7 p-1 pr-0 cursor-pointer text-primary shrink-0", {
                "hover:fill-primary/50": !owned,
                "fill-primary": owned,
              })}
            />
          ))}
        {addToWishlistButton && (
          <AddToWishlist
            skinName={data.name}
            skinContentIds={[data.contentId]}
            trigger={({ onOpen, isInWishlist }) => (
              <HeartIcon
                onClick={onOpen}
                className={cn("size-7 p-1 pr-0 text-destructive cursor-pointer shrink-0", {
                  "fill-destructive": isInWishlist,
                  "hover:fill-destructive/50": !isInWishlist,
                })}
              />
            )}
          />
        )}

        {wishlistId &&
          (isWishlistUpdating ? (
            <Spinner className="size-5 my-1 text-primary shrink-0" />
          ) : (
            <HeartIcon
              onClick={removeFromWishlistHandler}
              className="size-7 p-1 pr-0 text-destructive cursor-pointer fill-destructive shrink-0"
            />
          ))}
      </div>
      <NavLink to={`/skins/${data.contentId}`} className="mb-2 font-medium line-clamp-2 hover:underline w-fit">
        {data.name}
      </NavLink>
    </div>
  );
};

export default SkinCard;
