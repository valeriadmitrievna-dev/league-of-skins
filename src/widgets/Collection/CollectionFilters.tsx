import { orderBy } from "lodash";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetRaritiesQuery } from "@/api";
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
import { RARITIES } from "@/shared/constants/rarities";
import { cn } from "@/shared/utils/cn";
import type { UserSkinsStatisticDto } from "@/types/user";

interface CollectionFiltersProps {
  get: (key: string) => string | null;
  update: (key: string, value?: string | null) => void;
  data?: UserSkinsStatisticDto["distribution"];
  loading?: boolean;
  fetching?: boolean;
  className?: string;
}

const CollectionFilters: FC<CollectionFiltersProps> = ({ get, update, data, loading, fetching, className }) => {
  const { t } = useTranslation();
  const { data: rarities = [], isLoading: isRaritiesLoading } = useGetRaritiesQuery();

  const filterCN = "flex-1 min-w-[280px]";

  return (
    <div className={cn("flex items-stretch gap-2 flex-wrap", className)}>
      {loading ? (
        <Skeleton className={cn("h-9", filterCN)} />
      ) : (
        <Combobox
          items={orderBy(data?.byChampion, "name")}
          value={get("championId")}
          itemToStringLabel={(value: string) => data?.byChampion.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("championId", value)}
          disabled={fetching}
        >
          <ComboboxInput placeholder={t("filters.searchBy_champion")} disabled={fetching} showClear className={filterCN} />
          <ComboboxContent className="p-1 py-2">
            <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
            <ComboboxList className="scrollbar p-0 px-1">
              {(item) => (
                <ComboboxItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
      {isRaritiesLoading || loading ? (
        <Skeleton className={cn("h-9", filterCN)} />
      ) : (
        <Combobox
          items={rarities}
          value={get("rarity")}
          itemToStringLabel={(value: string) => t(`rarity.${rarities.find((c) => c === value)}`)}
          onValueChange={(value) => update("rarity", value)}
          disabled={fetching}
        >
          <ComboboxInput placeholder={t("filters.searchBy_rarity")} disabled={fetching} showClear className={filterCN} />
          <ComboboxContent className="p-1 py-2 w-(--radix-popover-trigger-width)">
            <ComboboxEmpty>{t("shared.no-items-found")}</ComboboxEmpty>
            <ComboboxList className="scrollbar p-0 px-1">
              {(item) => {
                const distribution = data?.byRarity.find((r) => r.value === item);
                return (
                  <ComboboxItem key={item} value={item} disabled={!distribution?.count}>
                    <span className="block rounded-sm size-3" style={{ background: RARITIES[item]?.color }} />
                    {t(`rarity.${item}`)}
                  </ComboboxItem>
                );
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      )}
      {loading ? (
        <Skeleton className={cn("h-9", filterCN)} />
      ) : (
        <Combobox
          items={orderBy(data?.bySkinline, "name")}
          defaultValue={get("skinlineId")}
          itemToStringLabel={(value: string) => data?.bySkinline.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("skinlineId", value)}
          disabled={fetching}
        >
          <ComboboxInput placeholder={t("filters.searchBy_skinline")} showClear disabled={fetching} className={filterCN} />
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
      {loading ? (
        <Skeleton className={cn("h-9", filterCN)} />
      ) : (
        <Combobox
          items={orderBy(data?.byChroma, "name")}
          defaultValue={get("chromaId")}
          itemToStringLabel={(value: string) => data?.byChroma.find((c) => c.id === value)?.name ?? value}
          onValueChange={(value) => update("chromaId", value)}
          disabled={fetching}
        >
          <ComboboxInput placeholder={t("filters.searchBy_chroma")} showClear disabled={fetching} className={filterCN} />
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
    </div>
  );
};

export default CollectionFilters;
