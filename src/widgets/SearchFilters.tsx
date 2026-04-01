import { orderBy } from "lodash";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import ChromaColor from "@/components/ChromaColor";
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
import { appAuthSelector } from "@/store";
import type { ChampionDto } from "@/types/champion";
import type { OptionItem } from "@/types/shared";
import type { SkinlineDto } from "@/types/skinline";

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

  const { data: rarities = [], isLoading: isRaritiesLoading } = useGetRaritiesQuery();
  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });
  const { data: skinlinesData, isLoading: isSkinlinesLoading } = useGetSkinlinesQuery({ lang: i18n.language });
  const { data: chromasData, isLoading: isChromasLoading } = useGetChromasQuery({ lang: i18n.language });

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skinlines } = getODataWithDefault(skinlinesData);
  const { data: chromas } = getODataWithDefault(chromasData);

  const legacyOptions = [
    { value: "all", label: t("filters.all"), className: "max-w-13" },
    { value: "on", label: t("filters.legacy-on") },
    { value: "off", label: t("filters.legacy-off") },
  ];

  const ownedOptions = [
    { value: "all", label: t("filters.all"), className: "max-w-13" },
    { value: "on", label: t("filters.owned-on") },
    { value: "off", label: t("filters.owned-off") },
  ];

  return (
    <div className={cn("bg-card border-e h-full overflow-hidden grid grid-rows-[auto_1fr]", className)}>
      <FilterPanelTitle onReset={hasActive && reset} className="border-b px-4 py-3" />
      <div className="h-full overflow-auto scrollbar-full">
        <div className="border-b px-3 py-3 flex flex-col gap-3">
          {isAuth && (
            <FilterToggleGroup
              value={get("owned") ?? "all"}
              onChange={(value) => update("owned", value)}
              options={ownedOptions}
            />
          )}
          <FilterToggleGroup
            value={get("legacy") ?? "all"}
            onChange={(value) => update("legacy", value)}
            options={legacyOptions}
          />
        </div>
        <Field className="px-3 py-3 border-b">
          <Label>{t("filters.champion")}</Label>
          <Combobox
            items={orderBy(champions, "name")}
            itemToStringLabel={(value) => champions.find((champion) => champion.id === value)?.name ?? ""}
            value={get("championId")}
            onValueChange={(value) => update("championId", value)}
            disabled={isChampionsLoading}
          >
            <ComboboxInput placeholder={t("shared.search")} showClear disabled={isChampionsLoading} />
            <ComboboxContent className="p-1 py-2">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="scrollbar p-0 px-1">
                {(item: ChampionDto) => (
                  <ComboboxItem key={item.id} value={item.id}>
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field className="px-3 py-3 border-b">
          <Label>{t("filters.rarity")}</Label>
          <Combobox
            items={rarities.map((r) => {
              return {
                value: r,
                label: t(`rarity.${r}`),
              };
            })}
            value={get("rarity")}
            onValueChange={(value) => update("rarity", value)}
            itemToStringLabel={(value) => t(`rarity.${value}`)}
            disabled={isRaritiesLoading}
          >
            <ComboboxInput placeholder={t("shared.search")} showClear disabled={isRaritiesLoading} />
            <ComboboxContent className="p-1 py-2">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="scrollbar p-0 px-1">
                {(item: OptionItem) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    <span
                      className="block size-2 bg-input rounded-full"
                      style={{ background: RARITIES[item.value]?.color }}
                    />
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field className="px-3 py-3 border-b">
          <Label>{t("filters.skinline")}</Label>
          <Combobox
            items={orderBy(skinlines, "name")}
            value={get("skinlineId")}
            onValueChange={(value) => update("skinlineId", value)}
            itemToStringLabel={(value) => skinlines.find((skinline) => skinline.id.toString() === value)?.name ?? ""}
            disabled={isSkinlinesLoading}
          >
            <ComboboxInput placeholder={t("shared.search")} showClear disabled={isSkinlinesLoading} />
            <ComboboxContent className="p-1 py-2">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="scrollbar p-0 px-1">
                {(item: SkinlineDto) => (
                  <ComboboxItem key={item.id} value={item.id}>
                    {item.name}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
        <Field className="px-3 py-3">
          <Label>{t("filters.chroma")}</Label>
          <Combobox
            items={orderBy(chromas, "name").map((chroma) => ({
              value: chroma.id,
              label: chroma.name,
              prefix: <ChromaColor colors={chroma.colors} />,
            }))}
            value={get("chromaId")}
            onValueChange={(value) => update("chromaId", value)}
            itemToStringLabel={(value) => chromas.find((chroma) => chroma.id === value)?.name ?? ""}
            disabled={isChromasLoading}
          >
            <ComboboxInput placeholder={t("shared.search")} showClear disabled={isChromasLoading} />
            <ComboboxContent className="p-1 py-2">
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList className="scrollbar p-0 px-1">
                {(item: OptionItem) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.prefix}
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
      </div>
    </div>
  );
};

export default SearchFilters;
