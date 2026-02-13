import { useGetSkinQuery } from "@/api";
import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import Video from "@/components/Video";
import { getChromaColorName } from "@/shared/utils/getChromaColorName";
import { ChevronLeftIcon, FrownIcon, HeartPlusIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router";

const SearchPageSkin: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { skinContentId } = useParams();

  const { data: skin, isLoading } = useGetSkinQuery({ contentId: skinContentId!, lang: i18n.language });

  const goBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Button className="cursor-pointer w-fit" variant="outline" size="sm" onClick={goBackHandler}>
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
            {!skin.video && <Image src={skin.image.uncentered!} className="object-cover aspect-405/239" />}
            {skin.video && (
              <Video src={skin.video.uncentered!} autoPlay muted loop className="object-cover aspect-405/239" />
            )}
          </div>

          <div className="pt-4 flex flex-col gap-y-2 max-w-[60%]">
            {skin.skinlines.map((skinline) => (
              <Badge key={skinline.id} variant="outline">
                {skinline.name}
              </Badge>
            ))}
            <p className="text-2xl font-bold">{skin.name}</p>
            <p className="">{skin.description}</p>
          </div>

          {skin.chromas?.length && (
            <div className="pt-6 flex flex-col gap-y-2">
              <p className="text-xl font-semibold">Chromas</p>
              <div className="grid gap-x-2 gap-y-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] bg-muted py-2 px-4 rounded-md">
                {skin.chromas.map((chroma) => (
                  <div key={chroma.contentId} className="flex flex-col items-center relative group">
                    <Image src={chroma.path} className="transition-opacity group-hover:opacity-50" />
                    <Badge className="absolute bottom-4">{getChromaColorName(chroma.name, i18n.language)}</Badge>
                    <Button
                      className="
                        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        opacity-0 group-hover:opacity-100 cursor-pointer
                        size-16
                      "
                      size="icon-lg"
                    >
                      <HeartPlusIcon className='size-6!' />
                    </Button>
                  </div>
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
