import type { FC } from "react";
import { useTranslation } from 'react-i18next';

import Image from "@/components/Image";
import { Typography } from "@/components/Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import type { UserSkinsStatisticDto } from "@/types/user";

interface CollectionRaritiesProps {
  data?: UserSkinsStatisticDto["distribution"]["byRarity"];
  className?: string;
}

const CollectionRarities: FC<CollectionRaritiesProps> = ({ data = [], className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("my-card h-auto! flex items-center justify-center", className)}>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 max-w-45">
        {Object.entries(RARITIES).map(([key, rarity]) => {
          const distribution = data.find((r) => r.value === key);
          return (
            <div key={key} className="flex flex-col items-center gap-2 select-none">
              <Tooltip>
                <TooltipTrigger><Image src={rarity.icon} className="w-6" /></TooltipTrigger>
                <TooltipContent>{t(`rarity.${key}`)}</TooltipContent>
              </Tooltip>
              <Typography.Small className={cn({ 'opacity-50': !distribution?.count })}>{distribution?.count ?? 0}</Typography.Small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionRarities;
