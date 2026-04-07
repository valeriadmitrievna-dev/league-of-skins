import type { FC } from "react";
import { useTranslation } from "react-i18next";

import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/formatNumber";

interface CollectionWastedProps {
  skinsPrice: number;
  chromasPrice: number;
  loading?: boolean;
  className?: string;
  withHint?: boolean;
}

const CollectionWasted: FC<CollectionWastedProps> = ({ skinsPrice = 0, chromasPrice = 0, loading, className, withHint }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("my-card h-auto! flex flex-col gap-y-4 justify-center items-center", className)}>
      <div className="flex items-center justify-between w-full gap-y-1">
        <Typography.Small>
          {t("header.skins")} {withHint && <Typography.Muted className='inline text-muted-foreground'>*</Typography.Muted>}
        </Typography.Small>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="flex items-center gap-x-2 font-medium">
            {formatNumber(skinsPrice)}
            <RPIcon className="size-4" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full gap-y-1">
        <Typography.Small>
          {t("header.chromas")} {withHint && <Typography.Muted className='inline text-muted-foreground'>*</Typography.Muted>}
        </Typography.Small>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="flex items-center gap-x-2 font-medium">
            {formatNumber(chromasPrice)}
            <RPIcon className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionWasted;
