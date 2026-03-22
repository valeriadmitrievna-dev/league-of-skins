import { orderBy } from "lodash";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import { Separator } from "@/components/ui/separator";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/shared/utils/cn";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector } from "@/store";
import FilterItem from "@/widgets/Filters/FilterItem";
import FilterList from "@/widgets/Filters/FilterList";

import FilterPanelTitle from "./Filters/FilterPanelTitle";
import FilterToggleGroup from "./Filters/FilterToggleGroup";
import FilterToggleTags from "./Filters/FilterToggleTags";

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
    <div className={cn("bg-card border border-primary/20 p-5 h-fit rounded-md", className)}>
      <FilterPanelTitle onReset={hasActive && reset} className="mb-5" />
      <div>
        {isAuth && (
          <FilterToggleGroup
            value={get("owned") ?? "all"}
            onChange={(value) => update("owned", value)}
            options={ownedOptions}
            className="mb-3"
          />
        )}
        <FilterToggleGroup
          value={get("legacy") ?? "all"}
          onChange={(value) => update("legacy", value)}
          options={legacyOptions}
        />
        <Separator className="mt-3" />
        <FilterItem defaultOpen value={get("championId") ?? ""} title={t("filters.champion")} onClear={() => update("championId")}>
          <FilterList
            items={orderBy(champions, "name").map((champion) => ({ value: champion.id, label: champion.name }))}
            value={get("championId") ?? ""}
            onChange={(value) => update("championId", value)}
            isLoading={isChampionsLoading}
            withSearch
          />
        </FilterItem>
        <FilterItem value={get("rarity") ?? ""} title={t("filters.rarity")} onClear={() => update("rarity")}>
          <FilterToggleTags
            value={get("rarity") ?? ""}
            onChange={(value) => update("rarity", value)}
            options={rarities.map((r) => {
              return {
                value: r,
                label: t(`rarity.${r}`),
              };
            })}
            loading={isRaritiesLoading}
          />
        </FilterItem>
        <FilterItem value={get("skinlineId") ?? ""} title={t("filters.skinline")} onClear={() => update("skinlineId")}>
          <FilterList
            items={orderBy(skinlines, "name").map((skinline) => ({ value: skinline.id.toString(), label: skinline.name }))}
            value={get("skinlineId") ?? ""}
            onChange={(value) => update("skinlineId", value)}
            isLoading={isSkinlinesLoading}
            withSearch
          />
        </FilterItem>
        <FilterItem value={get("chromaId") ?? ""} title={t("filters.chroma")} onClear={() => update("chromaId")}>
          <FilterList
            items={orderBy(chromas, "name").map((chroma) => ({
              value: chroma.id,
              label: chroma.name,
              prefix: <ChromaColor colors={chroma.colors} />,
            }))}
            value={get("chromaId") ?? ""}
            onChange={(value) => update("chromaId", value)}
            isLoading={isChromasLoading}
            withSearch
          />
        </FilterItem>
      </div>
    </div>
  );
};

export default SearchFilters;
