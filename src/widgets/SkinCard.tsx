import Image from "@/components/Image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SkinDto } from "@/store";
import { HeartPlusIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface SkinCardProps {
  data: SkinDto;
}

const SkinCard: FC<SkinCardProps> = ({ data }) => {
  const { t } = useTranslation();

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
      <div className="absolute top-2 end-2 z-3 flex gap-1">
        {data.isLegacy && <Badge variant="secondary">Legacy</Badge>}
        {data.rarity !== "kNoRarity" && <Badge variant="secondary">{t(`rarity.${data.rarity}`)}</Badge>}
      </div>
      <CardContent
        className="
          absolute size-full p-4 z-2
          bg-linear-to-t from-neutral-950/75 to-transparent
          flex items-end justify-end
          opacity-0 hover:opacity-100 transition-opacity
        "
      >
        <Button
          variant="outline"
          size="icon-lg"
          className="cursor-pointer bg-transparent text-neutral-50 light:hover:text-neutral-900"
        >
          <HeartPlusIcon className="size-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkinCard;
