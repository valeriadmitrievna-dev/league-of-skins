import { orderBy } from "lodash";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import Skeleton from "@/components/Skeleton";
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
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector, appSkinsFoundSelector } from "@/store";

import FilterPanelTitle from "./Filters/FilterPanelTitle";
import FilterToggleGroup from "./Filters/FilterToggleGroup";

interface SearchFiltersProps {
  className?: string;
}

const SearchFilters: FC<SearchFiltersProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const { get, update, reset, hasActive } = useQueryParams([
    "owned",
    "legacy",
    "championId",
    "rarity",
    "skinlineId",
    "chromaId",
  ]);

  const isAuth = useSelector(appAuthSelector);
  const skinsFound = useSelector(appSkinsFoundSelector);

  const { data: rarities = [], isLoading: isRaritiesLoading } = useGetRaritiesQuery();
  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });
  const { data: skinlinesData, isLoading: isSkinlinesLoading } = useGetSkinlinesQuery({ lang: i18n.language });
  const { data: chromasData, isLoading: isChromasLoading } = useGetChromasQuery({ lang: i18n.language });

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skinlines } = getODataWithDefault(skinlinesData);
  const { data: chromas } = getODataWithDefault(chromasData);

  const legacyOptions = [
    { value: "all", label: t("filters.all") },
    { value: "on", label: t("filters.legacy-on") },
    { value: "off", label: t("filters.legacy-off") },
  ];

  const ownedOptions = [
    { value: "all", label: t("filters.all") },
    { value: "on", label: t("filters.owned-on") },
    { value: "off", label: t("filters.owned-off") },
  ];

  return (
    <div className={cn("h-fit sticky top-4", className)}>
      <FilterPanelTitle onReset={hasActive && reset} className="mb-4" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {isAuth && (
            <FilterToggleGroup
              value={get("owned") ?? "all"}
              onChange={(value) => update("owned", value)}
              options={ownedOptions}
              className="grid grid-cols-[20%_1fr_1fr]"
            />
          )}
          <FilterToggleGroup
            value={get("legacy") ?? "all"}
            onChange={(value) => update("legacy", value)}
            options={legacyOptions}
            className="grid grid-cols-[20%_1fr_1fr]"
          />
        </div>
        <Field className="gap-2">
          <Label>{t("filters.champion")}</Label>
          {isChampionsLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Combobox
              items={orderBy(champions, "name")}
              defaultValue={get("championId")}
              itemToStringLabel={(value: string) => champions.find((c) => c.id === value)?.name ?? value}
              onValueChange={(value) => update("championId", value)}
            >
              <ComboboxInput placeholder={t("shared.search")} showClear />
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
          )}
        </Field>
        <Field className="gap-2">
          <Label>{t("filters.rarity")}</Label>
          {isRaritiesLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Combobox
              items={rarities}
              defaultValue={get("rarity")}
              itemToStringLabel={(value: string) => t(`rarity.${rarities.find((c) => c === value)}`)}
              onValueChange={(value) => update("rarity", value)}
            >
              <ComboboxInput placeholder={t("shared.search")} showClear />
              <ComboboxContent className="p-1 py-2 w-(--radix-popover-trigger-width)">
                <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
                <ComboboxList className="scrollbar p-0 px-1">
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      <span className="block rounded-sm size-3" style={{ background: RARITIES[item]?.color }} />
                      {t(`rarity.${item}`)}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          )}
        </Field>
        <Field className="gap-2">
          <Label>{t("filters.skinline")}</Label>
          {isSkinlinesLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Combobox
              items={orderBy(skinlines, "name")}
              defaultValue={get("skinlineId")}
              itemToStringLabel={(value: string) => skinlines.find((c) => c.id.toString() === value)?.name ?? value}
              onValueChange={(value) => update("skinlineId", value)}
            >
              <ComboboxInput placeholder={t("shared.search")} showClear />
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
          )}
        </Field>
        <Field className="gap-2">
          <Label>{t("filters.chroma")}</Label>
          {isChromasLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Combobox
              items={orderBy(chromas, "name")}
              defaultValue={get("chromaId")}
              itemToStringLabel={(value: string) => chromas.find((c) => c.id.toString() === value)?.name ?? value}
              onValueChange={(value) => update("chromaId", value)}
            >
              <ComboboxInput placeholder={t("shared.search")} showClear />
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
          )}
        </Field>
        <p className="block text-sm text-muted-foreground">
          {t("filters.found_count", { count: skinsFound })} {skinsFound} {t("shared.skin", { count: skinsFound })}
        </p>
      </div>
    </div>
  );
};

export default SearchFilters;
