import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FunnelIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import FilterList from "@/widgets/FilterList";
import { Accordion } from "@/components/ui/accordion";
import FilterItem from "@/widgets/FilterItem";
import ChromaColor from "@/components/ChromaColor";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { appAuthSelector } from "@/store";
import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { cn } from "@/shared/utils/cn";

const SearchFilters: FC = () => {
  const { t, i18n } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const isAuth = useSelector(appAuthSelector);

  const legacy = searchParams.get("legacy") ?? "all";
  const owned = searchParams.get("owned") ?? "all";
  const championId = searchParams.get("championId");
  const skinlineId = searchParams.get("skinlineId");
  const chromaId = searchParams.get("chromaId");
  const rarity = searchParams.get("rarity");

  const { data: rarities = [] } = useGetRaritiesQuery();
  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });
  const { data: skinlinesData, isLoading: isSkinlinesLoading } = useGetSkinlinesQuery({ lang: i18n.language });
  const { data: chromasData, isLoading: isChromasLoading } = useGetChromasQuery({ lang: i18n.language });

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skinlines } = getODataWithDefault(skinlinesData);
  const { data: chromas } = getODataWithDefault(chromasData);

  const [championSearch, setChampionSearch] = useState("");
  const [skinlineSearch, setSkinlineSearch] = useState("");
  const [chromaSearch, setChromaSearch] = useState("");

  const legacyOptions = [
    { value: "all", label: t("filters.all"), className: "max-w-15" },
    { value: "on", label: t("filters.legacy-on") },
    { value: "off", label: t("filters.legacy-off") },
  ];

  const ownedOptions = [
    { value: "all", label: t("filters.all"), className: "max-w-15" },
    { value: "on", label: t("filters.owned-on") },
    { value: "off", label: t("filters.owned-off") },
  ];

  const getAppliedFiltersPresence = () => {
    const legacyFilter = legacy && legacy !== "all";
    const ownedFilter = owned && owned !== "all";

    return !!legacyFilter || !!ownedFilter || !!championId || !!skinlineId || rarity || chromaId;
  };

  const updateQueryHandler = (param: string, value?: string, removable?: boolean) => {
    if (value === "all") {
      value = undefined;
      removable = true;
    }

    if (value) {
      setSearchParams((prevSearchParams) => {
        prevSearchParams.set(param, value);
        return prevSearchParams;
      });
    }

    if (!value && removable) {
      removeQueryHandler(param);
    }
  };

  const removeQueryHandler = (param: string) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete(param);
      return prevSearchParams;
    });
  };

  const resetFiltersHandler = () => {
    setSearchParams({});
  };

  return (
    <div className="my-card flex flex-col gap-y-3">
      <div className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md border border-foreground/10">
        <p className="flex items-center gap-2">
          <FunnelIcon size={16} />
          <span className="font-medium text-base">{t("filters.title")}</span>
        </p>
        {!!getAppliedFiltersPresence() && (
          <Button size="xs" onClick={resetFiltersHandler} className="rounded-sm">
            {t("filters.reset")}
          </Button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={["rarity"]}>
        {isAuth && (
          <ToggleGroup
            variant="outline"
            type="single"
            value={owned}
            onValueChange={(value) => updateQueryHandler("owned", value)}
            className="w-full mb-3"
          >
            {ownedOptions.map((option) => (
              <ToggleGroupItem className={cn("grow", option.className)} value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        )}
        <ToggleGroup
          variant="outline"
          type="single"
          value={legacy}
          onValueChange={(value) => updateQueryHandler("legacy", value)}
          className="w-full pb-3 border-b rounded-none"
        >
          {legacyOptions.map((option) => (
            <ToggleGroupItem className={cn("grow", option.className)} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <FilterItem
          value="champion"
          title={t("filters.champion")}
          hasValue={!!championId}
          onClear={() => removeQueryHandler("championId")}
        >
          <Search size="sm" value={championSearch} onSearch={setChampionSearch} className="plane-input" />
          <FilterList
            items={champions.map((champion) => ({ value: champion.id, label: champion.name }))}
            value={championId ?? ""}
            onChange={(value) => updateQueryHandler("championId", value, true)}
            isLoading={isChampionsLoading}
          />
        </FilterItem>
        <FilterItem
          value="rarity"
          title={t("filters.rarity")}
          hasValue={!!rarity}
          onClear={() => removeQueryHandler("rarity")}
        >
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            spacing={1}
            className="items-start w-full flex-wrap"
            value={rarity ?? ""}
            onValueChange={(value) => updateQueryHandler("rarity", value, true)}
          >
            {rarities.map((rarity) => (
              <ToggleGroupItem
                key={rarity}
                value={rarity}
                aria-label={t(`rarity.${rarity}`)}
                className="w-fit h-8 items-center justify-start"
              >
                {t(`rarity.${rarity}`)}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FilterItem>
        <FilterItem
          value="skinline"
          title={t("filters.skinline")}
          hasValue={!!skinlineId}
          onClear={() => removeQueryHandler("skinlineId")}
        >
          <Search size="sm" value={skinlineSearch} onSearch={setSkinlineSearch} className="plane-input" />
          <FilterList
            items={skinlines.map((skinline) => ({ value: skinline.id.toString(), label: skinline.name }))}
            value={skinlineId ?? ""}
            onChange={(value) => updateQueryHandler("skinlineId", value, true)}
            isLoading={isSkinlinesLoading}
          />
        </FilterItem>
        <FilterItem
          value="chroma"
          title={t("filters.chroma")}
          hasValue={!!chromaId}
          onClear={() => removeQueryHandler("chromaId")}
        >
          <Search size="sm" value={chromaSearch} onSearch={setChromaSearch} className="plane-input" />
          <FilterList
            items={chromas.map((chroma) => ({
              value: chroma.id,
              label: chroma.name,
              prefix: <ChromaColor colors={chroma.colors} />,
            }))}
            value={chromaId ?? ""}
            onChange={(value) => updateQueryHandler("chromaId", value, true)}
            isLoading={isChromasLoading}
          />
        </FilterItem>
      </Accordion>
    </div>
  );
};

export default SearchFilters;
