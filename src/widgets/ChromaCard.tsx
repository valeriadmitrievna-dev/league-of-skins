import { BookmarkIcon, HeartIcon } from "lucide-react";
import type { FC } from "react";
import { NavLink } from "react-router";

import { useUpdateWishlistMutation } from "@/api";
import { useUpdateOwnedChromasMutation } from "@/api/queries/ownedChromas.api";
import Image from "@/components/Image";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/shared/utils/cn";
import type { ChromaDto } from "@/types/chroma";

import AddToWishlist from "./AddToWishlist";

interface ChromaCardProps {
  className?: string;
  data: ChromaDto;
  owned?: boolean | "hidden";
  addToWishlistButton?: boolean;
  toggleOwnedButton?: boolean;
  wishlistId?: string;
}

const ChromaCard: FC<ChromaCardProps> = ({ className, data, owned, addToWishlistButton, toggleOwnedButton, wishlistId }) => {
  const [updateOwnedChromas, { isLoading: isOwningUpdating }] = useUpdateOwnedChromasMutation();
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const toggleOwnedHandler = () => {
    if (owned) updateOwnedChromas({ removeIds: [data.contentId] });
    else updateOwnedChromas({ addIds: [data.contentId] });
  };

  const removeFromWishlistHandler = async () => {
    try {
      if (wishlistId) {
        await updateWishlist({ wishlistId, body: { removeChromaIds: [data.contentId] } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <Card className="block relative group aspect-90/101 rounded-md overflow-hidden p-0">
        <NavLink to={`/skins/${data.skinContentId}`}>
          <Image src={data.path ?? ""} className="object-cover size-full transition-all group-hover:scale-[1.1]" />
        </NavLink>
      </Card>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium line-clamp-1 mr-auto">{data.skinName}</span>
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
            chromaName={data.fullName}
            chromaContentIds={[data.contentId]}
            trigger={({ onOpen, isChromaInWishlist }) => (
              <HeartIcon
                onClick={onOpen}
                className={cn("size-7 p-1 pr-0 text-destructive cursor-pointer shrink-0", {
                  "fill-destructive": isChromaInWishlist,
                  "hover:fill-destructive/50": !isChromaInWishlist,
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
      <p className="mb-2 font-medium line-clamp-2 hover:underline w-fit">{data.name}</p>
    </div>
  );
};

export default ChromaCard;
