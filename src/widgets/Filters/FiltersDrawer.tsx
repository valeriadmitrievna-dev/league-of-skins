import { orderBy } from "lodash";
import { FunnelIcon } from "lucide-react";
import { useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetChampionsQuery, useGetChromasQuery, useGetRaritiesQuery, useGetSkinlinesQuery } from "@/api";
import ChromaColor from "@/components/ChromaColor";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useQueryParams } from "@/hooks/useQueryParams";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector } from "@/store";

import FilterItem from "./FilterItem";
import FilterList from "./FilterList";
import FilterToggleGroup from "./FilterToggleGroup";
import FilterToggleTags from "./FilterToggleTags";

interface FiltersDrawerProps {
  trigger?: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
}

const FiltersDrawer: FC<FiltersDrawerProps> = ({ trigger }) => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

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
    { value: "all", label: t("filters.all"), className: "max-w-15" },
    { value: "on", label: t("filters.legacy-on") },
    { value: "off", label: t("filters.legacy-off") },
  ];

  const ownedOptions = [
    { value: "all", label: t("filters.all"), className: "max-w-15" },
    { value: "on", label: t("filters.owned-on") },
    { value: "off", label: t("filters.owned-off") },
  ];

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(true);
  };

  const closeHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="relative" asChild>
        {trigger?.({ openState: open, onOpen: openHandler }) ?? (
          <Button size="icon">
            <FunnelIcon />
            {hasActive && <span className="absolute size-2 rounded-full bg-blue-500 right-2 top-2" />}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-full gap-0 overflow-hidden">
        <SheetHeader className="border-b">
          <SheetTitle>{t("filters.title")}</SheetTitle>
        </SheetHeader>

        <div className="h-full overflow-y-auto px-4 py-4">
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
            className="mb-3"
          />
          <FilterItem
            value={get("championId") ?? ""}
            title={t("filters.champion")}
            onClear={() => update("championId")}
            defaultOpen
          >
            <FilterList
              items={orderBy(champions, "name").map((champion) => ({ value: champion.id, label: champion.name }))}
              value={get("championId") ?? ""}
              onChange={(value) => update("championId", value)}
              isLoading={isChampionsLoading}
              withSearch
            />
          </FilterItem>
          <FilterItem defaultOpen value={get("rarity") ?? ""} title={t("filters.rarity")} onClear={() => update("rarity")}>
            <FilterToggleTags
              value={get("rarity") ?? ""}
              onChange={(value) => update("rarity", value)}
              options={rarities.map((r) => ({ value: r, label: t(`rarity.${r}`) }))}
              loading={isRaritiesLoading}
            />
          </FilterItem>
          <FilterItem
            defaultOpen
            value={get("skinlineId") ?? ""}
            title={t("filters.skinline")}
            onClear={() => update("skinlineId")}
          >
            <FilterList
              items={orderBy(skinlines, "name").map((skinline) => ({ value: skinline.id.toString(), label: skinline.name }))}
              value={get("skinlineId") ?? ""}
              onChange={(value) => update("skinlineId", value)}
              isLoading={isSkinlinesLoading}
              withSearch
            />
          </FilterItem>
          <FilterItem
            defaultOpen
            value={get("chromaId") ?? ""}
            title={t("filters.chroma")}
            onClear={() => update("chromaId")}
          >
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

        <SheetFooter className="border-t">
          <Button variant="outline" disabled={!hasActive} onClick={reset}>
            {t("filters.reset")}
          </Button>
          <Button variant="ghost" onClick={closeHandler}>
            {t("shared.close")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersDrawer;
