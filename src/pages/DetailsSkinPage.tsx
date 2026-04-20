import { useCallback, useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";

import { useGetSkinQuery, useGetUserQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import Image from "@/components/Image";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import Video from "@/components/Video";
import EmptyDetailsSkin from "@/emptystates/EmptyDetailsSkin";
import { appAuthSelector } from "@/store/app/app.selectors";
import type { ChromaDto } from "@/types/chroma";
import ChromaCard from "@/widgets/ChromaCard";
import DetailsSkinAside from "@/widgets/DetailsSkin/DetailsSkinAside";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

const DetailsSkinPage: FC = () => {
  const { skinContentId } = useParams();
  const { t, i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, { skip: !isAuth });

  const { data: skin, isLoading } = useGetSkinQuery({ contentId: skinContentId!, lang: i18n.language });

  const ownedSet = useMemo(() => new Set(user?.ownedChromas ?? []), [user?.ownedChromas]);

  const renderChroma = useCallback(
    (item: unknown, _index: number) => {
      const chroma = item as ChromaDto;
      const owned = ownedSet.has(chroma.contentId);

      return (
        <ChromaCard
          id={`chromaView-${chroma.id}`}
          data={chroma}
          owned={owned}
          addToWishlistButton
          toggleOwnedButton={Boolean(user)}
          plain
        />
      );
    },
    [user, ownedSet],
  );

  if (isLoading && !skin)
    return (
      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <div className="flex flex-col gap-y-3">
          <Skeleton className="h-40" />
          <Skeleton className="h-20" />
          <Skeleton className="h-auto aspect-square" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <div>
          <Skeleton className="h-auto aspect-video" />
          <Skeleton className="mt-3 h-5 w-full max-w-40" />
          <Skeleton className="mt-1 h-9 w-full max-w-120" />
          <Skeleton className="mt-2 h-30" />
        </div>
      </div>
    );

  if (!isLoading && !skin) return <EmptyDetailsSkin />;

  if (!skin) return null;

  return (
    <>
      <CustomHead>
        <title>{skin.name ? `League of Skins | ${skin.name}` : "League of Skins"}</title>
        <meta name="description" content={skin.description ?? ""} />
      </CustomHead>

      <div className="grid md:grid-cols-[280px_1fr] gap-8">
        <DetailsSkinAside skin={skin} />

        <div className="mt-4 order-first md:order-last md:mt-0">
          <div className="overflow-hidden rounded-md border border-foreground/15 bg-foreground/5 relative">
            {!skin.video && !skin.questSkinInfo && (
              <Image src={skin.image.uncentered!} className="object-cover aspect-405/239 w-full" />
            )}
            {skin.video && !skin.questSkinInfo && (
              <Video src={skin.video.uncentered!} autoPlay muted loop className="object-cover aspect-405/239 w-full" />
            )}
            {skin.questSkinInfo && (
              <Image src={skin.questSkinInfo.uncenteredSplashPath ?? ""} className="object-cover aspect-405/239 w-full" />
            )}
          </div>

          <div className="mt-5 flex wrap-normal gap-2">
            {skin.skinlines.map((skinline) => (
              <NavLink to={"/search/skins?skinlineId=" + String(skinline.id)} key={skinline.id}>
                <Badge variant="secondary">{skinline.name}</Badge>
              </NavLink>
            ))}
          </div>
          <Typography.H2 className="mt-2">{skin.name}</Typography.H2>
          <Typography.P className="mt-2" dangerouslySetInnerHTML={{ __html: skin.description }} />

          {!!skin.chromas?.length && (
            <div className="mt-6">
              <Typography.H4 className="mb-4">{t("skin.chromas")}</Typography.H4>
              <VirtualizedGrid items={skin.chromas} overscan={4} render={renderChroma} columnGap={16} rowGap={24} />
            </div>
          )}

          {!!skin.questSkinInfo && (
            <div className="mt-6">
              <Typography.H4 className="mb-4">{t("skin.quest")}</Typography.H4>
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
                {skin.questSkinInfo.tiers.map((tier) => (
                  <div key={tier.name} className="group relative">
                    <span className="absolute top-2 left-2 size-8 flex items-center justify-center bg-neutral-900 text-neutral-100 rounded-md z-10">
                      {tier.stage}
                    </span>
                    <div className="group relative rounded-md overflow-hidden aspect-405/239 border border-foreground/15 bg-foreground/5">
                      <Image src={tier.uncenteredSplashPath ?? ""} className="size-full object-cover" />
                      <Video
                        src={tier.collectionSplashVideoPath ?? tier.splashVideoPath ?? ""}
                        showError={false}
                        autoPlay
                        muted
                        loop
                        className={"absolute h-full w-full object-cover left-0 top-0 z-5"}
                      />
                    </div>
                    <Typography.Large className="mt-2">{tier.name}</Typography.Large>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!skin.features?.length && (
            <div className="mt-6">
              <Typography.H4 className="mb-4">{t("skin.features")}</Typography.H4>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {skin.features.map((feature) => (
                  <div key={feature.description} className="relative overflow-hidden rounded-md aspect-1056/720">
                    <Video src={feature.videoPath} className="w-full aspect-1056/720" controls loop />

                    <div className="absolute w-full z-10 top-2 left-2">
                      <Image src={feature.iconPath} className="w-[10%] aspect-square" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsSkinPage;
