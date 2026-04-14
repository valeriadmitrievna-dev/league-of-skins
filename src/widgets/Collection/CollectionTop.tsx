import type { FC } from "react";
import { useTranslation } from "react-i18next";

import InfoLine from "@/components/InfoLine";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/shared/utils/cn";
import type { UserSkinsStatisticDto } from "@/types/user";

import CollectionMedal from "./CollectionMedal";

interface CollectionTopProps {
  data?: UserSkinsStatisticDto["top"]["champions"];
  get?: (key: string) => string | null;
  update?: (key: string, value?: string | null) => void;
  loading?: boolean;
  className?: string;
}

const CollectionTop: FC<CollectionTopProps> = ({ data, get, update, loading, className }) => {
  const { t } = useTranslation();

  const championClickHandler = (championId: string) => {
    const currentChampionId = get?.("championId");

    if (championId !== currentChampionId) {
      update?.("championId", championId);
    }
  };

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
                    <Typography.Small
                      className={cn("my-tag ml-1 py-2!", { "cursor-pointer": !!update })}
                      onClick={() => championClickHandler(items[0].id)}
                    >
                      {items[0].name}
                    </Typography.Small>
                    {items.length > 1 && (
                      <HoverCard openDelay={0}>
                        <HoverCardTrigger>
                          <Typography.Small className="my-tag text-muted-foreground px-2! py-2! cursor-help">
                            +{items.length - 1}
                          </Typography.Small>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-auto grid grid-cols-2 gap-1">
                          <Typography.Muted className="col-span-2 mb-2">
                            Еще чемпионы, у которых {items[0].count} {t("shared.skin", { count: items[0].count })}:
                          </Typography.Muted>
                          {items.slice(1).map((champion) => (
                            <Typography.Small
                              className={cn("my-tag py-2!", { "cursor-pointer": !!update })}
                              onClick={() => championClickHandler(champion.id)}
                            >
                              {champion.name}
                            </Typography.Small>
                          ))}
                        </HoverCardContent>
                      </HoverCard>
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
