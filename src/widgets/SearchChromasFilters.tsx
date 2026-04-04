import { orderBy } from "lodash";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetChampionsQuery, useGetSkinsQuery } from "@/api";
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
import { cn } from "@/shared/utils/cn";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import { appAuthSelector, appChromasFoundSelector, appChromasLoadingSelector } from "@/store/app/app.selectors";

import FilterPanelTitle from "./Filters/FilterPanelTitle";
import FilterToggleGroup from "./Filters/FilterToggleGroup";

interface SearchFiltersProps {
  className?: string;
}

const SearchSkinsFilters: FC<SearchFiltersProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const { get, update, reset, hasActive } = useQueryParams(["owned", "skin", "championId", "skinContentId"]);

  const isAuth = useSelector(appAuthSelector);
  const isChromasLoading = useSelector(appChromasLoadingSelector);
  const chromasFound = useSelector(appChromasFoundSelector);

  const { data: championsData, isLoading: isChampionsLoading } = useGetChampionsQuery({ lang: i18n.language });

  const { data: skinsData, isFetching: isSkinsLoading } = useGetSkinsQuery(
    { lang: i18n.language, legacy: "all", owned: "all", championId: get("championId")!, hasChroma: "true" },
    { skip: !get("championId") },
  );

  const { data: champions } = getODataWithDefault(championsData);
  const { data: skins } = getODataWithDefault(skinsData);

  const ownedOptions = [
    { value: "all", label: t("filters.all") },
    { value: "on", label: t("filters.owned-on") },
    { value: "off", label: t("filters.owned-off") },
  ];

  const skinsOptions = [
    { value: "all", label: t("filters.all") },
    { value: "on", label: t("filters.skin-on") },
    { value: "off", label: t("filters.skin-off") },
  ];

  const changeChampionIdHandler = (value: string | null) => {
    update("skinContentId");
    return update("championId", value);
  };

  return (
    <div className={cn("h-fit sticky top-4", className)}>
      <FilterPanelTitle onReset={hasActive && reset} className="mb-4" />
      <div className="flex flex-col gap-4">
        {isAuth && (
          <>
            <FilterToggleGroup
              value={get("owned") ?? "all"}
              onChange={(value) => update("owned", value)}
              options={ownedOptions}
              className="grid grid-cols-[20%_1fr_1fr]"
              disabled={isChromasLoading}
            />
            <FilterToggleGroup
              value={get("skin") ?? "all"}
              onChange={(value) => update("skin", value)}
              options={skinsOptions}
              className="grid grid-cols-[20%_1fr_1fr]"
              disabled={isChromasLoading}
            />
          </>
        )}
        <Field className="gap-2">
          <Label>{t("filters.champion")}</Label>
          {isChampionsLoading ? (
            <Skeleton className="h-9" />
          ) : (
            <Combobox
              items={orderBy(champions, "name")}
              value={get("championId")}
              itemToStringLabel={(value: string) => champions.find((c) => c.id === value)?.name ?? value}
              onValueChange={changeChampionIdHandler}
              disabled={isChromasLoading}
            >
              <ComboboxInput placeholder={t("shared.search")} disabled={isChromasLoading} showClear />
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
        {!!get("championId") && (
          <Field className="gap-2">
            <Label>{t("filters.skin")}</Label>
            {isSkinsLoading ? (
              <Skeleton className="h-9" />
            ) : (
              <Combobox
                items={orderBy(skins, "name")}
                value={get("skinContentId")}
                itemToStringLabel={(value: string) => skins.find((c) => c.contentId === value)?.name ?? value}
                onValueChange={(value) => update("skinContentId", value)}
              >
                <ComboboxInput placeholder={t("shared.search")} showClear />
                <ComboboxContent className="p-1 py-2">
                  <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
                  <ComboboxList className="scrollbar p-0 px-1">
                    {(item) => (
                      <ComboboxItem key={item.contentId} value={item.contentId}>
                        {item.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
          </Field>
        )}
        <p className="block text-sm text-muted-foreground">
          {t("filters.found_count", { count: chromasFound })} {chromasFound} {t("shared.chroma", { count: chromasFound })}
        </p>
      </div>
    </div>
  );
};

export default SearchSkinsFilters;
