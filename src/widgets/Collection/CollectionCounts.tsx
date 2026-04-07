import type { FC } from "react";
import { useTranslation } from "react-i18next";

import InfoLine from "@/components/InfoLine";
import Skeleton from "@/components/Skeleton";
import { cn } from "@/shared/utils/cn";
import type { UserSkinsStatisticDto } from "@/types/user";

interface CollectionCountsProps {
  data?: UserSkinsStatisticDto["user"];
  totals?: UserSkinsStatisticDto["totals"];
  loading?: boolean;
  className?: string;
}

const CollectionCounts: FC<CollectionCountsProps> = ({ data, totals, loading, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("my-card flex flex-col justify-center gap-y-2 md:dark:bg-input/30", className)}>
      <InfoLine
        label={t("shared.skins")}
        value={loading ? <Skeleton className="h-6 w-21" /> : `${data?.skins} / ${totals?.skins}`}
        className="bg-transparent!"
        labelClassName="p-0! bg-transparent! text-sm"
        valueClassName="text-sm! leading-4 px-2!"
      />
      <InfoLine
        label={t("stats.total_champions")}
        value={loading ? <Skeleton className="h-6 w-18.5" /> : `${data?.champions} / ${totals?.champions}`}
        className="bg-transparent!"
        labelClassName="p-0! bg-transparent! text-sm"
        valueClassName="text-sm! leading-4 px-2!"
      />
      <InfoLine
        label={t("filters.skinlines")}
        value={loading ? <Skeleton className="h-6 w-18.5" /> : `${data?.skinlines} / ${totals?.skinlines}`}
        className="bg-transparent!"
        labelClassName="p-0! bg-transparent! text-sm"
        valueClassName="text-sm! leading-4 px-2!"
      />
      <InfoLine
        label={t("stats.total_legacy")}
        value={loading ? <Skeleton className="h-6 w-8" /> : data?.legacy.toString()}
        className="bg-transparent!"
        labelClassName="p-0! bg-transparent! text-sm"
        valueClassName="text-sm! leading-4 px-2!"
      />
    </div>
  );
};

export default CollectionCounts;
