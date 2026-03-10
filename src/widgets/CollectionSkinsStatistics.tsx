import { useGetOwnedSkinsStatsQuery } from "@/api";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import FilterList from "./Filters/FilterList";
import { Typography } from "@/components/Typography";
import InfoLine from "@/components/InfoLine";
import { cn } from "@/shared/utils/cn";
import { orderBy } from "lodash";
import MedalFirstIcon from "@/shared/assets/medal-first.svg?react";
import MedalSecondIcon from "@/shared/assets/medal-second.svg?react";
import MedalThirdIcon from "@/shared/assets/medal-third.svg?react";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import Skeleton from "@/components/Skeleton";
import { useQueryParams } from "@/hooks/useQueryParams";
import FilterItem from "./Filters/FilterItem";
import ChromaColor from "@/components/ChromaColor";

interface IProps {
  className?: string;
}

const CollectionSkinsStatistics: FC<IProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { data: statistics, isLoading } = useGetOwnedSkinsStatsQuery({ lang: i18n.language });

  const { get, update } = useQueryParams(["legacy", "championId", "rarity", "skinlineId", "chromaId"]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-3">
        <div className="my-card flex flex-col gap-y-4">
          <Skeleton asChild count={3} className="h-7" />
        </div>
        <div className="my-card flex flex-col gap-y-2">
          <Skeleton asChild count={4} className="h-6" />
        </div>
        <div className="my-card flex flex-col gap-y-2">
          <Skeleton className="h-7" />
          <Typography.Muted>{t("skin.priceHelperFull")}</Typography.Muted>
        </div>
        <div className="my-card flex flex-col gap-y-2">
          <Skeleton asChild count={8} className="h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-3", className)}>
      {/* Top champions by skins */}
      <div className="my-card flex flex-col gap-y-4">
        {!!Object.keys(statistics?.top.champions ?? {}).length &&
          Object.entries(statistics!.top.champions).map(([place, items]) => (
            <div key={place} className="flex items-center gap-1">
              {Number(place) === 1 && <MedalFirstIcon className="size-7" />}
              {Number(place) === 2 && <MedalSecondIcon className="size-7" />}
              {Number(place) === 3 && <MedalThirdIcon className="size-7" />}

              <InfoLine
                label={
                  <div className="flex items-center gap-1">
                    <Typography.P className="my-tag ml-1">{items[0].name}</Typography.P>
                    {items.length > 1 && (
                      <Typography.P className="my-tag text-muted-foreground px-2!">+{items.length - 1}</Typography.P>
                    )}
                  </div>
                }
                value={String(items[0].count)}
                className="grow"
              />
            </div>
          ))}
      </div>

      {/* Totals */}
      <div className="my-card flex flex-col gap-y-2 pl-4!">
        <InfoLine
          label={t("shared.skins")}
          value={`${statistics?.user.skins} / ${statistics?.totals.skins}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("stats.total_champions")}
          value={`${statistics?.user.champions} / ${statistics?.totals.champions}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("filters.skinlines")}
          value={`${statistics?.user.skinlines} / ${statistics?.totals.skinlines}`}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
        <InfoLine
          label={t("stats.total_legacy")}
          value={statistics?.user.legacy.toString()}
          className="bg-transparent!"
          labelClassName="p-0! bg-transparent! text-sm"
          valueClassName="text-sm! leading-4 px-2!"
        />
      </div>

      {/* Price */}
      <div className="my-card flex flex-col gap-y-2">
        <InfoLine
          label={<Typography.Small>{t("skin.price")}</Typography.Small>}
          value={
            <div className="my-tag">
              <Typography.P>{statistics?.user.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Typography.P>
              <RPIcon className="size-4.5" />
            </div>
          }
          className="bg-transparent!"
        />
        <Typography.Muted>{t("skin.priceHelperFull")}</Typography.Muted>
      </div>

      {/* Rarities */}
      <div className="my-card flex flex-col gap-y-2">
        {orderBy(statistics?.distribution.byRarity, "count", "desc").map((rarity) => (
          <InfoLine
            key={rarity.value}
            label={
              <Typography.Small
                onClick={() =>
                  rarity.value === get("rarity") ? update("rarity", undefined) : update("rarity", rarity.value)
                }
                className={cn("my-tag cursor-pointer select-none", {
                  "text-muted-foreground pointer-events-none": !rarity.count,
                  "bg-foreground! text-background!": rarity.value === get("rarity"),
                })}
              >
                {t(`rarity.${rarity.value}`)}
              </Typography.Small>
            }
            value={String(rarity.count)}
            valueClassName={cn("text-sm leading-4 px-2!", { "text-muted-foreground pointer-events-none": !rarity.count })}
          />
        ))}
      </div>

      {/* Champions */}
      <div className="my-card py-1!">
        <FilterItem
          title={t("filters.searchBy_champion")}
          value={get("championId") ?? ""}
          onClear={() => update("championId")}
        >
          <FilterList
            items={
              orderBy(statistics?.distribution.byChampion, "name").map((champion) => ({
                value: champion.id,
                label: champion.name,
              })) ?? []
            }
            value={get("championId") ?? ""}
            onChange={(value) => update("championId", value)}
            withSearch
          />
        </FilterItem>
      </div>

      {/* Skinlines */}
      <div className="my-card py-1!">
        <FilterItem
          title={t("filters.searchBy_skinline")}
          value={get("skinlineId") ?? ""}
          onClear={() => update("skinlineId")}
        >
          <FilterList
            items={
              orderBy(statistics?.distribution.bySkinline, "name").map((skinline) => ({
                value: skinline.id,
                label: skinline.name,
              })) ?? []
            }
            value={get("skinlineId") ?? ""}
            onChange={(value) => update("skinlineId", value)}
            withSearch
          />
        </FilterItem>
      </div>

      {/* Chroma */}
      <div className="my-card py-1!">
        <FilterItem title={t("filters.searchBy_chroma")} value={get("chromaId") ?? ""} onClear={() => update("chromaId")}>
          <FilterList
            items={
              orderBy(statistics?.distribution.byChroma, "name").map((chroma) => ({
                value: chroma.id,
                label: chroma.name,
                prefix: <ChromaColor colors={chroma.colors} />,
              })) ?? []
            }
            value={get("chromaId") ?? ""}
            onChange={(value) => update("chromaId", value)}
            withSearch
          />
        </FilterItem>
      </div>
    </div>
  );
};

export default CollectionSkinsStatistics;
