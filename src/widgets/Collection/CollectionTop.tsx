import type { FC } from "react";
import { useTranslation } from "react-i18next";

import InfoLine from "@/components/InfoLine";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/shared/utils/cn";
import type { UserSkinsStatisticDto } from "@/types/user";

import CollectionMedal from "./CollectionMedal";

interface CollectionTopProps {
  data?: UserSkinsStatisticDto["top"]["champions"];
  loading?: boolean;
  className?: string;
}

const CollectionTop: FC<CollectionTopProps> = ({ data, loading, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("my-card flex flex-col justify-center gap-y-3 md:dark:bg-input/30 h-auto!", className)}>
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <CollectionMedal place={i + 1} />
              <InfoLine
                label={<Skeleton className="ml-1 h-7.5 w-20" />}
                value={<Skeleton className="h-7 w-8.5" />}
                className="grow"
              />
            </div>
          ))
        : !!Object.keys(data ?? {}).length &&
          Object.entries(data ?? {}).map(([place, items]) => (
            <div key={place} className="flex items-center gap-1">
              <CollectionMedal place={+place} />
              <InfoLine
                label={
                  <div className="flex items-center gap-1 relative">
                    <Typography.Small className="my-tag ml-1 py-2!">{items[0].name}</Typography.Small>
                    {items.length > 1 && (
                      <div className="absolute -inset-e-4 -top-2 bg-accent rounded-full size-6 flex items-center justify-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Typography.Small className="text-xs text-white cursor-pointer">
                              +{items.length - 1}
                            </Typography.Small>
                          </TooltipTrigger>
                          <TooltipContent>
                            {items.map((i) => (
                              <p key={i.id}>{i.name}</p>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}
                  </div>
                }
                value={
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="my-tag">{String(items[0].count)}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {items[0].count} {t("shared.skin", { count: items[0].count })}
                    </TooltipContent>
                  </Tooltip>
                }
                className="grow"
              />
            </div>
          ))}
    </div>
  );
};

export default CollectionTop;
