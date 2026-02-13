import { useGetSkinQuery } from "@/api";
import Image from "@/components/Image";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import Video from "@/components/Video";
import { ChevronLeftIcon, FrownIcon } from "lucide-react";
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
        <div>
          <div className="overflow-hidden rounded-md border border-foreground/15 bg-foreground/5 relative">
            {!skin.video && <Image src={skin.image.uncentered!} className="object-cover aspect-405/239" />}
            {skin.video && (
              <Video src={skin.video.uncentered!} autoPlay muted loop className="object-cover aspect-405/239" />
            )}
          </div>

          <div className="pt-4 flex flex-col gap-y-2 max-w-[60%]">
            {skin.skinlines.map(skinline => <Badge key={skinline.id} variant="outline">{skinline.name}</Badge>)}
            <p className="text-2xl font-bold">{skin.name}</p>
            <p className="">{skin.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPageSkin;
