import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FunnelIcon } from "lucide-react";
import { type FC } from "react";
import { useSearchFilters } from "../model";
import Skeleton from '@/components/Skeleton';

const SearchFilters: FC = () => {
  const { champions, isChampionsLoading, championId, championSearch, changeChampionIdHandler, searchChampionHandler } =
    useSearchFilters();

  return (
    <div className="border border-foreground/15 shadow-xs py-2 px-3 pb-4 rounded-md h-fit">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-2">
          <FunnelIcon size={20} />
          <span className="font-medium text-lg">Filters</span>
        </p>
        <Button className="cursor-pointer" size="xs" variant="destructive">
          Reset filters
        </Button>
      </div>
      <Separator className="my-2 mb-4" />
      <div className="flex flex-col gap-5">
        <Field className="w-full gap-y-2">
          <FieldLabel>Champion</FieldLabel>
          <Search size="sm" value={championSearch} onSearch={searchChampionHandler} />
          <ScrollArea className={`max-h-62 overflow-auto ${!isChampionsLoading && 'pe-2'}`}>
            <ToggleGroup
              type="single"
              orientation="vertical"
              spacing={1}
              className="flex-col items-start w-full"
              value={championId}
              onValueChange={changeChampionIdHandler}
            >
              {isChampionsLoading && <Skeleton count={4} />}
              {!isChampionsLoading && champions.map((champion) => (
                <ToggleGroupItem
                  key={champion.id}
                  className="cursor-pointer w-full h-8 flex-col items-start hover:text-foreground"
                  value={champion.id}
                  aria-label={champion.name}
                >
                  {champion.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ScrollArea>
        </Field>
      </div>
    </div>
  );
};

export default SearchFilters;
