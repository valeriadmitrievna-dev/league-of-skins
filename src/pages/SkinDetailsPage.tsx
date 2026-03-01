import { useGetSkinQuery, useGetUserQuery, useUpdateOwnedSkinsMutation } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Image from "@/components/Image";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Video from "@/components/Video";
import { RARITIES } from "@/shared/constants/rarities";
import { appAuthSelector, setFilters } from "@/store";
import { BadgeCheckIcon, CircleQuestionMarkIcon, PlayIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import MEIcon from "@/shared/assets/mythic-essence-icon.svg?react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AddToWishlist from "@/widgets/AddToWishlist";

const SkinDetailsPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { skinContentId } = useParams();
  const { t, i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);

  const { data: user } = useGetUserQuery("", { skip: !isAuth });
  const { data: skin, isLoading } = useGetSkinQuery({ contentId: skinContentId!, lang: i18n.language });
  const [updateOwnedSkins, { isLoading: isOwningUpdating }] = useUpdateOwnedSkinsMutation();

  const isOwned = user?.ownedSkins.includes(skin?.contentId ?? "");

  const chromaScrollHandler = (chromaId: string) => {
    const chromaView = document.getElementById(`chromaView-${chromaId}`);

    if (chromaView) {
      chromaView.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const championBadgeHandler = () => {
    dispatch(setFilters({ championId: skin!.championId }));
    navigate("/");
  };

  const rarityBadgeHandler = () => {
    dispatch(setFilters({ rarity: skin!.rarity }));
    navigate("/");
  };

  const skinlineBadgeHandler = (skinlineId: string) => {
    dispatch(setFilters({ skinlineId }));
    navigate("/");
  };

  const toggleOwnedHandler = () => {
    if (!skin) return;

    if (isOwned) updateOwnedSkins({ removeIds: [skin.contentId] });
    else updateOwnedSkins({ addIds: [skin.contentId] });
  };

  if (isLoading && !skin) return "Loading";
  if (!isLoading && !skin) return "Empty";

  const infoLine = (title: string, info: ReactNode, helpText?: string) => {
    return (
      <div className="flex gap-x-2 justify-between not-last:mb-3 min-h-5">
        <span className="inline-flex gap-1">
          {title}
          {!!helpText && (
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleQuestionMarkIcon className="size-3.25 text-foreground/60 cursor-help transform translate-y-0.5" />
              </TooltipTrigger>
              <TooltipContent>{helpText}</TooltipContent>
            </Tooltip>
          )}
        </span>
        <div className="grow border-b border-dashed h-3" />
        {info}
      </div>
    );
  };

  if (skin) {
    return (
      <div className="grid grid-cols-[320px_1fr] gap-x-4">
        <div className="flex flex-col gap-y-3">
          <div className="border border-foreground/15 shadow-x p-4 pt-5 rounded-md text-xs h-fit relative">
            {isOwned && (
              <Badge className="absolute bg-background gap-x-1.5 -top-2.5 right-4" variant="outline">
                <BadgeCheckIcon className="scale-120 text-sky-500 dark:text-blue-600" />
                {t("skin.owned")}
              </Badge>
            )}
            {infoLine(
              t("filters.champion"),
              <Badge variant="secondary" className="border-none cursor-pointer gap-x-1.5" onClick={championBadgeHandler}>
                {skin.championName}
              </Badge>,
            )}
            {infoLine(
              t("filters.rarity"),
              <Badge variant="secondary" className="gap-x-1.5 cursor-pointer border-none" onClick={rarityBadgeHandler}>
                {RARITIES?.icon && <Image src={RARITIES[skin.rarity].icon} className="size-4" />}
                {t(`rarity.${skin.rarity}`)}
              </Badge>,
            )}
            {!!RARITIES[skin.rarity]?.price &&
              infoLine(
                t("skin.price"),
                <div className="pr-2 font-medium flex items-center gap-1">
                  <span className="leading-none">{RARITIES[skin.rarity].price?.value}</span>
                  {RARITIES[skin.rarity].price?.type === "RP" && <RPIcon className="size-3.5" />}
                  {RARITIES[skin.rarity].price?.type === "ME" && <MEIcon className="size-3.5" />}
                </div>,
                t("skin.priceHelper"),
              )}
            {infoLine(
              t("rarity.legacy"),
              <span className="pr-2 font-medium">{t(`shared.${skin.isLegacy ? "yes" : "no"}`)}</span>,
            )}
          </div>
          {!!skin.chromas?.length && (
            <div className="border border-foreground/15 shadow-x py-3 px-4 rounded-md text-xs h-fit">
              <p className="mb-2">{t("skin.chromas")}</p>
              <div className="flex wrap-normal gap-2">
                {skin.chromas.map((chroma) => (
                  <ChromaColor
                    key={chroma.contentId}
                    colors={chroma.colors}
                    onClick={() => chromaScrollHandler(chroma.id)}
                  />
                ))}
              </div>
            </div>
          )}
          {skin.chromaPath && (
            <div className="mt-3 border border-foreground/15 shadow-x py-3 pt-7 px-4 aspect-square rounded-md text-xs h-fit relative bg-muted flex justify-center">
              <Badge variant="outline" className="bg-background absolute -top-2.5 left-1/2 transform -translate-x-1/2">
                {t("skin.baseChroma")}
              </Badge>
              <Image src={skin.chromaPath} className="max-w-[85%] h-fit" />
            </div>
          )}
          <AddToWishlist
            skinName={skin.name}
            skinContentId={skin.contentId}
            trigger={({ onOpen }) => <Button onClick={onOpen}>{t("skin.add")}</Button>}
          />
          {isAuth && (
            <Button variant="secondary" onClick={toggleOwnedHandler} disabled={isOwningUpdating}>
              {isOwningUpdating && <Spinner />}
              {isOwned ? t("skin.unmarkOwnedTooltip") : t("skin.markOwnedTooltip")}
            </Button>
          )}
          <Button variant="outline" asChild>
            <NavLink
              to={`https://www.youtube.com/results?search_query=${skin.name.toLowerCase().split(" ").join("+")}+spotlight`}
              target="_blank"
            >
              <PlayIcon />
              {t("skin.spotlight")}
            </NavLink>
          </Button>
        </div>
        <div>
          <div className="overflow-hidden rounded-md border border-foreground/15 bg-foreground/5 relative">
            {!skin.video && <Image src={skin.image.uncentered!} className="object-cover aspect-405/239 w-full" />}
            {skin.video && (
              <Video src={skin.video.uncentered!} autoPlay muted loop className="object-cover aspect-405/239 w-full" />
            )}
          </div>

          <div className="mt-3 flex wrap-normal gap-2">
            {skin.skinlines.map((skinline) => (
              <Badge
                key={skinline.id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => skinlineBadgeHandler(String(skinline.id))}
              >
                {skinline.name}
              </Badge>
            ))}
          </div>
          <Typography.H2 className="mt-1">{skin.name}</Typography.H2>
          <Typography.P className="mt-2" dangerouslySetInnerHTML={{ __html: skin.description }} />

          {!!skin.chromas?.length && (
            <div className="mt-6">
              <Typography.H4 className="mb-2">{t("skin.chromas")}</Typography.H4>
              <div className="grid gap-3 grid-cols-5 bg-muted py-5 px-5 rounded-md cursor-pointer">
                {skin.chromas.map((chroma) => (
                  <div
                    key={chroma.contentId}
                    id={`chromaView-${chroma.id}`}
                    className="relative rounded-md border not-hover:border-transparent hover:bg-foreground/5 transition"
                  >
                    <Image src={chroma.path} />
                    <Badge className="absolute bottom-2 left-1/2 transform -translate-x-1/2">{chroma.name}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!skin.features?.length && (
            <div className="mt-6">
              <Typography.H4 className="mb-2">{t("skin.features")}</Typography.H4>
              <div className="grid gap-3 grid-cols-2">
                {skin.features.map((feature) => (
                  <div key={feature.description} className="relative overflow-hidden rounded-md">
                    <Video src={feature.videoPath} className="w-full" controls loop />

                    <div className="absolute w-full z-10 top-2 left-2">
                      <Image src={feature.iconPath} className="w-[10%] rounded-md border border-neutral-50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default SkinDetailsPage;
