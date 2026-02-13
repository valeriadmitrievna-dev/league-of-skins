import Skeleton from "@/components/Skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, type ListRowRenderer } from "react-virtualized";

interface FilterListProps {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
}

const FilterList: FC<FilterListProps> = ({ items, value, onChange, isLoading }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [listHeight, setListHeight] = useState(248);

  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: false,
      defaultHeight: 32,
    }),
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      const container = containerRef.current!.querySelector('[role="row"]');
      setListHeight(Math.min(container?.clientHeight ?? 248, 248));
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    cacheRef.current.clearAll();
  }, [items]);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style, parent }) => {
      const item = items[index];

      return (
        <CellMeasurer key={key} cache={cacheRef.current} parent={parent} columnIndex={0} rowIndex={index}>
          {({ registerChild }) => (
            <div ref={registerChild} style={style}>
              <ToggleGroupItem
                className="
                  w-full flex justify-start
                  transition-colors hover:text-foreground
                  hover:bg-neutral-300/50 data-state-on:bg-neutral-300
                  dark:hover:bg-neutral-700/50 dark:data-state-on:bg-neutral-700
                  whitespace-normal text-left py-1 h-fit min-h-8
                "
                value={item.value}
                aria-label={item.label}
              >
                {item.label}
              </ToggleGroupItem>
            </div>
          )}
        </CellMeasurer>
      );
    },
    [items],
  );

  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 px-2 py-2 rounded-md border border-foreground/10">
      <ScrollArea className="max-h-62 overflow-auto scrollbar" ref={containerRef}>
        <ToggleGroup
          type="single"
          orientation="vertical"
          spacing={1}
          className="flex-col items-start w-full"
          value={value}
          onValueChange={onChange}
        >
          {isLoading && <Skeleton count={4} className="bg-neutral-300 dark:bg-neutral-700" />}

          {!isLoading && listHeight > 0 && (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  width={width}
                  height={listHeight}
                  deferredMeasurementCache={cacheRef.current}
                  rowHeight={cacheRef.current.rowHeight}
                  rowRenderer={rowRenderer}
                  rowCount={items.length}
                  overscanRowCount={5}
                  className="pe-2 scrollbar"
                />
              )}
            </AutoSizer>
          )}
        </ToggleGroup>
      </ScrollArea>
    </div>
  );
};

export default FilterList;
