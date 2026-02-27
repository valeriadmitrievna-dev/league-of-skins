import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SkinDto } from "@/store";
import { BadgeCheckIcon, HeartPlusIcon, SaveIcon, SaveOffIcon } from "lucide-react";
import type { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import AddToWishlist from "./AddToWishlist";
import { useGetUserQuery } from "@/api";
import { Typography } from "@/components/Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import ChromaColor from "@/components/ChromaColor";

interface SkinCardProps {
  data: SkinDto;
  addToWishlistButton?: boolean;
  toggleOwnedButton?: boolean;
}

const SkinCard: FC<SkinCardProps> = ({ data, addToWishlistButton, toggleOwnedButton }) => {
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const isOwned = user?.ownedSkins.includes(data.contentId);

  const toggleOwnedHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Card className="relative mx-auto w-full p-0 overflow-hidden gap-y-4 group">
      {data.video && (data.video.card || data.video.centered) && (
        <video
          src={data.video.card || data.video.centered!}
          autoPlay
          muted
          loop
          className="absolute z-1 aspect-11/20 object-cover transition-opacity opacity-0 group-hover:opacity-100"
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
        {isOwned && (
          <Badge variant="secondary" className="gap-x-1.5">
            <BadgeCheckIcon className="scale-120 text-blue-600 dark:text-sky-500" />
            <span>{t("skin.owned")}</span>
          </Badge>
        )}
      </div>
      {/* bg-linear-to-t from-neutral-950 to-transparent */}
      <CardContent
        className="
          absolute size-full p-4 z-2
          bg-neutral-950/75
          flex flex-col gap-3 items-end justify-end text-right text-neutral-50
          opacity-0 hover:opacity-100 transition-opacity
        "
      >
        <div className="flex flex-col gap-1 w-full">
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon-lg"
                    onClick={toggleOwnedHandler}
                    className="bg-transparent text-neutral-50 light:hover:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-950"
                  >
                    {isOwned ? <SaveOffIcon className="size-5" /> : <SaveIcon className="size-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isOwned ? t("skin.unmarkOwnedTooltip") : t("skin.markOwnedTooltip")}</TooltipContent>
              </Tooltip>
            )}
            {addToWishlistButton && (
              <AddToWishlist
                skinContentId={data.contentId}
                trigger={({ onOpen }) => (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-lg"
                        onClick={onOpen}
                        className="bg-transparent text-neutral-50 light:hover:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-950"
                      >
                        <HeartPlusIcon className="size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("skin.add")}</TooltipContent>
                  </Tooltip>
                )}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkinCard;
