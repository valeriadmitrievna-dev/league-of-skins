import { orderBy } from "lodash";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetOwnedSkinsStatsQuery, useGetRaritiesQuery } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import InfoLine from "@/components/InfoLine";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { useQueryParams } from "@/hooks/useQueryParams";
import MedalFirstIcon from "@/shared/assets/medal-first.svg?react";
import MedalSecondIcon from "@/shared/assets/medal-second.svg?react";
import MedalThirdIcon from "@/shared/assets/medal-third.svg?react";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import { cn } from "@/shared/utils/cn";
import { formatNumber } from "@/shared/utils/formatNumber";

interface CollectionStatisticsProps {
  className?: string;
}

const CollectionSkinsStatistics: FC<CollectionStatisticsProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const { data: rarities, isLoading: isRaritiesLoading } = useGetRaritiesQuery();
  const { data: stats, isLoading } = useGetOwnedSkinsStatsQuery({ lang: i18n.language });

  const { get, update } = useQueryParams(["legacy", "championId", "rarity", "skinlineId", "chromaId"]);

  return (
    <div className={cn("flex flex-col gap-y-8 md:gap-y-5", className)}>
      {/* Top champions by skins */}
      <div className="my-card flex flex-col gap-y-3 md:dark:bg-input/30">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                {i + 1 === 1 && <MedalFirstIcon className="size-6" />}
                {i + 1 === 2 && <MedalSecondIcon className="size-6" />}
                {i + 1 === 3 && <MedalThirdIcon className="size-6" />}

                <InfoLine
                  label={<Skeleton className="ml-1 h-7.5 w-20" />}
                  value={<Skeleton className="h-7 w-8.5" />}
                  className="grow"
                />
              </div>
            ))
          : !!Object.keys(stats?.top.champions ?? {}).length &&
            Object.entries(stats?.top?.champions ?? {}).map(([place, items]) => (
              <div key={place} className="flex items-center gap-1">
                {Number(place) === 1 && <MedalFirstIcon className="size-6" />}
                {Number(place) === 2 && <MedalSecondIcon className="size-6" />}
                {Number(place) === 3 && <MedalThirdIcon className="size-6" />}

                <InfoLine
                  label={
                    <div className="flex items-center gap-1">
                      <Typography.Small className="my-tag ml-1 py-2!">{items[0].name}</Typography.Small>
                      {items.length > 1 && (
                        <Typography.Small className="my-tag text-muted-foreground px-2! py-2!">
                          +{items.length - 1}
                        </Typography.Small>
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
      <div className="my-card flex flex-col gap-y-3 md:dark:bg-input/30">
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
      <div className="my-card flex flex-col gap-y-2 md:dark:bg-input/30">
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
      <div className="my-card flex flex-col gap-y-2 md:dark:bg-input/30">
        {isRaritiesLoading && isLoading && <Skeleton className="w-full h-8" />}
        {isLoading
          ? (rarities ?? []).map((rarity) => (
              <InfoLine
                key={rarity}
                label={
                  <Button size="sm" variant="ghost" disabled>
                    {t(`rarity.${rarity}`)}
                  </Button>
                }
                value={<Skeleton className="h-7 w-8.5" />}
              />
            ))
          : orderBy(stats?.distribution.byRarity, "count", "desc").map((rarity) => (
              <InfoLine
                key={rarity.value}
                label={
                  <Button
                    size="sm"
                    variant={rarity.value === get("rarity") ? "default" : "ghost"}
                    disabled={!rarity.count}
                    onClick={() =>
                      rarity.value === get("rarity") ? update("rarity", undefined) : update("rarity", rarity.value)
                    }
                  >
                    {t(`rarity.${rarity.value}`)}
                  </Button>
                }
                value={String(rarity.count)}
                valueClassName={cn({ "opacity-70 pointer-events-none": !rarity.count })}
              />
            ))}
      </div>

      <Field className="gap-2">
        <Label>{t("filters.searchBy_champion")}</Label>
        <Combobox
          items={orderBy(stats?.distribution.byChampion, "name")}
          defaultValue={get("championId")}
          itemToStringLabel={(value: string) => stats?.distribution.byChampion.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("championId", value)}
          disabled={isLoading}
        >
          <ComboboxInput placeholder={t("shared.search")} showClear disabled={isLoading} />
          <ComboboxContent className="p-1 py-2">
            <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
            <ComboboxList className="scrollbar p-0 px-1">
              {(item) => (
                <ComboboxItem key={item.id} value={item.id}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <Field className="gap-2">
        <Label>{t("filters.searchBy_skinline")}</Label>
        <Combobox
          items={orderBy(stats?.distribution.bySkinline, "name")}
          defaultValue={get("skinlineId")}
          itemToStringLabel={(value: string) => stats?.distribution.bySkinline.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("skinlineId", value)}
          disabled={isLoading}
        >
          <ComboboxInput placeholder={t("shared.search")} showClear disabled={isLoading} />
          <ComboboxContent className="p-1 py-2">
            <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
            <ComboboxList className="scrollbar p-0 px-1">
              {(item) => (
                <ComboboxItem key={item.id} value={item.id}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
      <Field className="gap-2">
        <Label>{t("filters.searchBy_chroma")}</Label>
        <Combobox
          items={orderBy(stats?.distribution.byChroma, "name")}
          defaultValue={get("chromaId")}
          itemToStringLabel={(value: string) => stats?.distribution.byChroma.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("chromaId", value)}
          disabled={isLoading}
        >
          <ComboboxInput placeholder={t("shared.search")} showClear disabled={isLoading} />
          <ComboboxContent className="p-1 py-2">
            <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
            <ComboboxList className="scrollbar p-0 px-1">
              {(item) => (
                <ComboboxItem key={item.id} value={item.id}>
                  <ChromaColor colors={item.colors} className="size-5 rounded-sm border-none" />
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    </div>
  );
};

export default CollectionSkinsStatistics;
