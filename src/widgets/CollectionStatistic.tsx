import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetOwnedSkinsStatsQuery } from "@/api";
import Image from "@/components/Image";
import InfoLine from "@/components/InfoLine";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/formatNumber";

interface CollectionStatisticProps {
  className?: string;
}

const CollectionStatistic: FC<CollectionStatisticProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { data: stats, isLoading } = useGetOwnedSkinsStatsQuery({ lang: i18n.language });

  return (
    <div className={cn("w-full flex items-stretch gap-x-4", className)}>
      {/* Totals */}
      <div className="my-card h-auto! w-full max-w-80 shrink-0 flex flex-col justify-center gap-y-2 md:dark:bg-input/30">
        <InfoLine
          label={t("shared.skins")}
          value={isLoading ? <Skeleton className="h-6 w-21" /> : `${stats?.user.skins} / ${stats?.totals.skins}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("stats.total_champions")}
          value={isLoading ? <Skeleton className="h-6 w-18.5" /> : `${stats?.user.champions} / ${stats?.totals.champions}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("filters.skinlines")}
          value={isLoading ? <Skeleton className="h-6 w-18.5" /> : `${stats?.user.skinlines} / ${stats?.totals.skinlines}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("stats.total_legacy")}
          value={isLoading ? <Skeleton className="h-6 w-8" /> : stats?.user.legacy.toString()}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
      </div>

      {/* Price */}
      <div className="my-card h-auto! w-full max-w-120 shrink-0 flex flex-col gap-y-2 md:dark:bg-input/30">
        <InfoLine
          label={<Typography.Small className="font-medium">{t("skin.wasted")}</Typography.Small>}
          value={
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Skeleton className="h-4 w-16 rounded-[4px]" />
              ) : (
                <Typography.Small>{formatNumber(stats?.user.value ?? 0)}</Typography.Small>
              )}
              <RPIcon className="size-4" />
            </div>
          }
        />

        <Typography.Muted>{t("skin.priceHelperFull")}</Typography.Muted>
      </div>

      {/* Rarities */}
      <div className="my-card h-auto! w-full flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {Object.entries(RARITIES).map(([key, data]) => {
          const distribution = stats?.distribution.byRarity.find((r) => r.value === key);
          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <Image src={data.icon} className="w-6" />
              <Typography.Small>{distribution?.count}</Typography.Small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionStatistic;
