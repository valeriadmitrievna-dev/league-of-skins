import { useGetSkinQuery } from "@/api";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import Video from "@/components/Video";
import { getChromaColorName } from "@/shared/utils/getChromaColorName";
import { setFilters } from "@/store";
import AddToWishlist from "@/widgets/AddToWishlist";
import { ChevronLeftIcon, FrownIcon, HeartPlusIcon, PlayIcon } from "lucide-react";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router";
import { GetListByKeyword } from "youtube-search-api";

const SearchPageSkin: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skinContentId } = useParams();
  const { t, i18n } = useTranslation();

  const { data: skin, isLoading } = useGetSkinQuery({ contentId: skinContentId!, lang: i18n.language });

  const goBackHandler = () => {
    navigate(-1);
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

  const getSpotlightVideo = async () => {
    try {
      const res = await GetListByKeyword(`${skin!.name.toLowerCase().split(" ").join("+")}+spotlight`);
      console.log("[DEV]", res);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // const err = error as YouTubeAPIError;
      console.log("[DEV]", "error getting spotlight video");
    }
  };

  useEffect(() => {
    if (skin) getSpotlightVideo();
    console.log("[DEV]", skin?.features);
  }, [skin]);

  return (
    <div className="flex flex-col gap-y-4">
      <Button className="w-fit" variant="outline" size="sm" onClick={goBackHandler}>
        <ChevronLeftIcon />
        {t("shared.back")}
      </Button>
      {!isLoading && !skin && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FrownIcon />
            </EmptyMedia>
            <EmptyTitle>Error on loading skin data</EmptyTitle>
            <EmptyDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, soluta?</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" asChild>
              <NavLink to="/">Go to list of skins</NavLink>
            </Button>
          </EmptyContent>
        </Empty>
      )}
      {!isLoading && skin && (
        <div className="pb-10">
          <div className="overflow-hidden rounded-md border border-foreground/15 bg-foreground/5 relative">
            {!skin.video && <Image src={skin.image.uncentered!} className="object-cover aspect-405/239 w-full" />}
            {skin.video && (
              <Video src={skin.video.uncentered!} autoPlay muted loop className="object-cover aspect-405/239 w-full" />
            )}
          </div>

          <div className="pt-4 flex gap-x-4">
            {skin.chromaPath && (
              <div className="w-64 bg-muted p-4 rounded-md flex items-center justify-center relative">
                <Image src={skin.chromaPath} className="w-full object-cover" />
                <Badge className="absolute bottom-4">{t("skin.baseChroma")}</Badge>
              </div>
            )}
            <div className="flex flex-col gap-y-2 max-w-164">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="cursor-pointer" onClick={championBadgeHandler}>
                  {skin.championName}
                </Badge>
                {skin.rarity !== "kNoRarity" && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={rarityBadgeHandler}>
                    {t(`rarity.${skin.rarity}`)}
                  </Badge>
                )}
                {skin.skinlines.map((skinline) => (
                  <Badge
                    key={skinline.id}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => skinlineBadgeHandler(skinline.id.toString())}
                  >
                    {skinline.name}
                  </Badge>
                ))}
              </div>
              <p className="text-2xl font-bold">{skin.name}</p>
              <p className="">{skin.description}</p>
              <div className="mt-2 flex items-center gap-x-2">
                <AddToWishlist
                  trigger={({ onOpen }) => (
                    <Button className="w-fit" onClick={onOpen}>
                      {t("skin.add")}
                    </Button>
                  )}
                />
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
            </div>
          </div>

          {!!skin.chromas?.length && (
            <div className="pt-6 flex flex-col gap-y-2">
              <p className="text-xl font-semibold">{t("skin.chromas")}</p>
              <div className="grid gap-4 grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 bg-muted p-4 rounded-md">
                {skin.chromas.map((chroma) => (
                  <div key={chroma.contentId} className="flex flex-col items-center relative group">
                    <Image
                      src={chroma.path}
                      className="w-full transition-opacity group-hover:opacity-50 inset-shadow-neutral-100 inset-shadow-[0_0_8px_8px]"
                    />
                    <Badge className="absolute bottom-4">{getChromaColorName(chroma.name, i18n.language)}</Badge>
                    <AddToWishlist
                      trigger={({ onOpen }) => (
                        <Button
                          className="
                            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            opacity-0 group-hover:opacity-100
                            size-16
                          "
                          size="icon-lg"
                          onClick={onOpen}
                        >
                          <HeartPlusIcon className="size-6!" />
                        </Button>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!skin.features?.length && (
            <div className="pt-6 flex flex-col gap-y-2">
              <p className="text-xl font-semibold">{t("skin.features")}</p>
              <div className="grid grid-cols-2 gap-3">
                {skin.features.map((feature) => (
                  <Card className="relative rounded-md w-full py-0 overflow-hidden">
                    <div className='absolute top-2 left-2 z-5 flex gap-x-2 pointer-events-none'>
                      <Image src={feature.iconPath} className='rounded-md' />
                      <span className='bg-muted/50 h-fit rounded-sm px-2 py-1 font-medium'>{feature.description}</span>
                    </div>
                    <Video src={feature.videoPath} className="aspect-22/15" controls />
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPageSkin;
