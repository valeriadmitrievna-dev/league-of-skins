import { BadgeCheckIcon, PlayIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

import { useGetUserQuery, useUpdateOwnedSkinsMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import MEIcon from "@/shared/assets/mythic-essence-icon.svg?react";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import { appAuthSelector } from "@/store";
import type { SkinDto } from "@/types/skin";
import AddToWishlist from "@/widgets/AddToWishlist";
import DetailsSkinInfoLine from "@/widgets/DetailsSkin/DetailsSkinInfoLine";

interface DetailsSkinAsideProps {
  className?: string;
  skin: SkinDto;
}

const DetailsSkinAside: FC<DetailsSkinAsideProps> = ({ className, skin }) => {
  const { t } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, { skip: !isAuth });
  const [updateOwnedSkins, { isLoading: isOwningUpdating }] = useUpdateOwnedSkinsMutation();

  const rarityData = skin.rarity ? RARITIES[skin.rarity] : undefined;

  const isOwned = user?.ownedSkins?.includes(skin.contentId ?? "") ?? false;

  const chromaScrollHandler = (chromaId: string) => {
    const chromaView = document.getElementById(`chromaView-${chromaId}`);

    if (chromaView) {
      chromaView.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const toggleOwnedHandler = () => {
    if (isOwned) updateOwnedSkins({ removeIds: [skin.contentId] });
    else updateOwnedSkins({ addIds: [skin.contentId] });
  };

  return (
    <aside className={cn("flex flex-col gap-y-3", className)}>
      <div className="my-card pt-6! pb-5! px-4! text-xs h-fit relative">
        {isOwned && (
          <Badge className="absolute bg-background gap-x-1.5 -top-2.5 right-4" variant="outline">
            <BadgeCheckIcon className="scale-120 text-sky-500 dark:text-blue-600" />
            {t("skin.owned")}
          </Badge>
        )}
        <DetailsSkinInfoLine
          title={t("filters.champion")}
          info={
            <NavLink to={"/search/skins?championId=" + skin.championId}>
              <Badge variant="secondary" className="border-none gap-x-1.5">
                {skin.championName}
              </Badge>
            </NavLink>
          }
        />
        <DetailsSkinInfoLine
          title={t("filters.rarity")}
          info={
            <NavLink to={"/search/skins?rarity=" + skin.rarity}>
              <Badge variant="secondary" className="gap-x-1.5 border-none">
                {RARITIES?.icon && <Image src={rarityData?.icon} className="size-4" />}
                {t(`rarity.${skin.rarity}`)}
              </Badge>
            </NavLink>
          }
        />

        {!!rarityData?.price && (
          <DetailsSkinInfoLine
            title={t("skin.price")}
            info={
              <div className="font-medium flex items-center gap-1">
                <span className="leading-none">{rarityData.price?.value}</span>
                {rarityData.price?.type === "RP" && <RPIcon className="size-3.5" />}
                {rarityData.price?.type === "ME" && <MEIcon className="size-3.5" />}
              </div>
            }
            helpText={t("skin.priceHelper")}
          />
        )}
        <DetailsSkinInfoLine
          title={t("rarity.legacy")}
          info={<span className="pr-2 font-medium">{t(`shared.${skin.isLegacy ? "yes" : "no"}`)}</span>}
        />
      </div>
      {!!skin.chromas?.length && (
        <div className="my-card px-4! text-xs h-fit">
          <p className="mb-2">{t("skin.chromas")}</p>
          <div className="flex flex-wrap gap-2">
            {skin.chromas.map((chroma) => (
              <ChromaColor key={chroma.contentId} colors={chroma.colors} onClick={() => chromaScrollHandler(chroma.id)} />
            ))}
          </div>
        </div>
      )}
      {skin.chromaPath && (
        <div className="mt-3 my-card py-3 pt-7! px-4! md:aspect-square text-xs h-fit relative bg-muted flex justify-center">
          <Badge variant="outline" className="bg-background absolute -top-2.5 left-1/2 transform -translate-x-1/2">
            {t("skin.baseChroma")}
          </Badge>
          <Image src={skin.chromaPath} className="max-w-[85%] h-fit aspect-90/101" />
        </div>
      )}
      <AddToWishlist
        skinName={skin.name}
        skinContentIds={[skin.contentId]}
        trigger={({ onOpen }) => <Button onClick={onOpen}>{t("skin.add")}</Button>}
      />
      {isAuth && (
        <Button variant="outline" onClick={toggleOwnedHandler} disabled={isOwningUpdating}>
          {isOwningUpdating && <Spinner />}
          {isOwned ? t("skin.unmarkOwnedTooltip") : t("skin.markOwnedTooltip")}
        </Button>
      )}
      <Button variant="outline" asChild>
        <NavLink
          to={`https://www.youtube.com/results?search_query=${(skin.originName || skin.name).toLowerCase().split(" ").join("+")}+spotlight`}
          target="_blank"
        >
          <PlayIcon />
          {t("skin.spotlight")}
        </NavLink>
      </Button>
    </aside>
  );
};

export default DetailsSkinAside;
