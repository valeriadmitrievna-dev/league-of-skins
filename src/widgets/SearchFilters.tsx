import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FunnelIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import FilterList from "@/widgets/FilterList";
import { Accordion } from "@/components/ui/accordion";
import FilterItem from "@/widgets/FilterItem";
import ChromaColor from "@/components/ChromaColor";
import useSearchFilters from '@/hooks/useSearchFilters';

const SearchFilters: FC = () => {
  const { t } = useTranslation();

  const {
    isAuth,
    rarities,
    champions,
    skinlines,
    chromas,
    isChampionsLoading,
    isSkinlinesLoading,
    isChromasLoading,
    isFilters,
    owned,
    legacy,
    championId,
    skinlineId,
    rarity,
    chroma,
    championSearch,
    skinlineSearch,
    chromaSearch,
    searchChampionHandler,
    searchSkinlineHandler,
    searchChromaHandler,
    changeChampionIdHandler,
    changeSkinlineIdHandler,
    changeRarityHandler,
    changeChromaHandler,
    clearChampionIdHandler,
    clearSkinlineIdHandler,
    clearRarityHandler,
    clearChromaHandler,
    toggleLegacyHandler,
    toggleOwnedHandler,
    resetFiltersHandler,
  } = useSearchFilters();

  return (
    <div className="border border-foreground/15 shadow-xs py-3 px-3 pb-0 rounded-md h-fit flex flex-col gap-y-3">
      <div className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md border border-foreground/10">
        <p className="flex items-center gap-2">
          <FunnelIcon size={20} />
          <span className="font-medium text-lg">{t("filters.title")}</span>
        </p>
        {isFilters && (
          <Button size="xs" onClick={resetFiltersHandler} className="rounded-sm">
            {t("filters.reset")}
          </Button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={["rarity"]}>
        {isAuth && (
          <ToggleGroup variant="outline" type="single" value={owned} onValueChange={toggleOwnedHandler} className='w-full mb-3'>
            <ToggleGroupItem className='grow max-w-15' value="all">{t('filters.all')}</ToggleGroupItem>
            <ToggleGroupItem className='grow' value="on">{t('filters.owned-on')}</ToggleGroupItem>
            <ToggleGroupItem className='grow' value="off">{t('filters.owned-off')}</ToggleGroupItem>
          </ToggleGroup>
        )}
        <ToggleGroup variant="outline" type="single" value={legacy} onValueChange={toggleLegacyHandler} className='w-full pb-3 border-b rounded-none'>
          <ToggleGroupItem className='grow max-w-15' value="all">{t('filters.all')}</ToggleGroupItem>
          <ToggleGroupItem className='grow' value="on">{t('filters.legacy-on')}</ToggleGroupItem>
          <ToggleGroupItem className='grow' value="off">{t('filters.legacy-off')}</ToggleGroupItem>
        </ToggleGroup>
        <FilterItem value="champion" title={t("filters.champion")} hasValue={!!championId} onClear={clearChampionIdHandler}>
          <Search size="sm" value={championSearch} onSearch={searchChampionHandler} className="plane-input" />
          <FilterList
            items={champions.map((champion) => ({ value: champion.id, label: champion.name }))}
            value={championId ?? ""}
            onChange={changeChampionIdHandler}
            isLoading={isChampionsLoading}
          />
        </FilterItem>
        <FilterItem value="rarity" title={t("filters.rarity")} hasValue={!!rarity} onClear={clearRarityHandler}>
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            spacing={1}
            className="items-start w-full flex-wrap"
            value={rarity ?? ""}
            onValueChange={changeRarityHandler}
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
        <FilterItem value="skinline" title={t("filters.skinline")} hasValue={!!skinlineId} onClear={clearSkinlineIdHandler}>
          <Search size="sm" value={skinlineSearch} onSearch={searchSkinlineHandler} className="plane-input" />
          <FilterList
            items={skinlines.map((skinline) => ({ value: skinline.id.toString(), label: skinline.name }))}
            value={skinlineId ?? ""}
            onChange={changeSkinlineIdHandler}
            isLoading={isSkinlinesLoading}
          />
        </FilterItem>
        <FilterItem value="chroma" title={t("filters.chroma")} hasValue={!!chroma} onClear={clearChromaHandler}>
          <Search size="sm" value={chromaSearch} onSearch={searchChromaHandler} className="plane-input" />
          <FilterList
            items={chromas.map((chroma) => ({
              value: chroma.id,
              label: chroma.name,
              prefix: <ChromaColor colors={chroma.colors} />,
            }))}
            value={chroma ? chroma.id : ""}
            onChange={changeChromaHandler}
            isLoading={isChromasLoading}
          />
        </FilterItem>
      </Accordion>
    </div>
  );
};

export default SearchFilters;
