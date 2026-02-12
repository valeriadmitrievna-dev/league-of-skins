import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FunnelIcon } from "lucide-react";
import { type FC } from "react";
import { useSearchFilters } from "../model";
import { useTranslation } from "react-i18next";
import FilterList from "@/widgets/FilterList";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getColorsString } from "@/shared/utils/getColorsString";

const SearchFilters: FC = () => {
  const { t } = useTranslation();

  const {
    rarities,
    champions,
    skinlines,
    chromas,
    isChampionsLoading,
    isSkinlinesLoading,
    isChromasLoading,
    isFilters,
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
    resetFiltersHandler,
  } = useSearchFilters();

  return (
    <div className="border border-foreground/15 shadow-xs py-3 px-3 rounded-md h-fit flex flex-col gap-y-3">
      <div className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 px-3 py-2 rounded-md border border-foreground/10">
        <p className="flex items-center gap-2">
          <FunnelIcon size={20} />
          <span className="font-medium text-lg">Filters</span>
        </p>
        {isFilters && (
          <Button className="cursor-pointer" size="xs" onClick={resetFiltersHandler}>
            Reset filters
          </Button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={["chroma", "champion", "rarity", "skinline"]}>
        <AccordionItem value="champion">
          <AccordionTrigger className="py-2 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <span>Champion</span>
              {championId && <span className="flex size-2 rounded-full bg-blue-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            <Search size="sm" value={championSearch} onSearch={searchChampionHandler} className="plane-input" />
            <FilterList
              items={champions.map((champion) => ({ value: champion.id, label: champion.name }))}
              value={championId ?? ""}
              onChange={changeChampionIdHandler}
              isLoading={isChampionsLoading}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rarity">
          <AccordionTrigger className="py-2 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <span>Rarity</span>
              {rarity && <span className="flex size-2 rounded-full bg-blue-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
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
                  aria-label="Toggle top"
                  className="cursor-pointer w-fit h-8 items-center justify-start"
                >
                  {t(`rarity.${rarity}`)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skinline">
          <AccordionTrigger className="py-2 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <span>Skinline</span>
              {skinlineId && <span className="flex size-2 rounded-full bg-blue-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            <Search size="sm" value={skinlineSearch} onSearch={searchSkinlineHandler} className="plane-input" />
            <FilterList
              items={skinlines.map((skinline) => ({ value: skinline.id.toString(), label: skinline.name }))}
              value={skinlineId ?? ""}
              onChange={changeSkinlineIdHandler}
              isLoading={isSkinlinesLoading}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="chroma">
          <AccordionTrigger className="py-2 cursor-pointer">
            <div className="flex items-center gap-x-2">
              <span>Chroma</span>
              {chroma && <span className="flex size-2 rounded-full bg-blue-500" />}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-y-2">
            <Search size="sm" value={chromaSearch} onSearch={searchChromaHandler} className="plane-input" />
            <FilterList
              items={chromas.map((chroma) => ({
                value: getColorsString(chroma.colors)!,
                label: chroma.isUnique ? chroma.name : `${chroma.name} (${chroma.skinName})`,
              }))}
              value={chroma ? getColorsString(chroma.colors)! : ""}
              onChange={changeChromaHandler}
              isLoading={isChromasLoading}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SearchFilters;
