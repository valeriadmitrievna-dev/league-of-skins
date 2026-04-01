import { useCallback, useEffect, useMemo, useRef, useState, type FC, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, type ListRowRenderer } from "react-virtualized";

import Search from "@/components/Search";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/shared/utils/cn";
import type { OptionItem } from "@/types/shared";

interface FilterListProps {
  items: OptionItem[];
  value: string;
  onChange: (value?: string) => void;
  isLoading?: boolean;
  withSearch?: boolean;
}

const FilterList: FC<FilterListProps> = ({ items: options, value, onChange, isLoading, withSearch }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const [listHeight, setListHeight] = useState(248);

  const cacheRef = useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      fixedHeight: false,
      defaultHeight: 32,
    }),
  );

  const items = useMemo(() => {
    return options.filter((option) => option.label.toLowerCase().includes(search.trim().toLowerCase()));
  }, [options, search]);

  const keyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onChange(items[0].value);
      }
    },
    [items, onChange],
  );

  useEffect(() => {
    if (!containerRef.current || !items.length) return;

    const observer = new ResizeObserver(() => {
      const container = containerRef.current?.querySelector('[role="row"]');
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
                className={cn(
                  "w-full flex justify-start gap-2 transition-colors hover:text-foreground hover:bg-accent/50 data-state-on:bg-accent whitespace-normal text-left py-1 h-fit min-h-9",
                  { "bg-accent/50": focus && !index },
                )}
                value={item.value}
                aria-label={item.label}
              >
                {!!item.prefix && <div className="shrink-0">{item.prefix}</div>}
                <span className={item.className}>{item.label}</span>
                {!!item.suffix && !focus && <div className="shrink-0 ml-auto">{item.suffix}</div>}
              </ToggleGroupItem>
            </div>
          )}
        </CellMeasurer>
      );
    },
    [items, focus],
  );

  const searchComponent = (
    <Search
      value={search}
      onSearch={setSearch}
      onKeyDown={keyDownHandler}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="plain-input"
    />
  );

  if (!isLoading && !items.length) {
    return (
      <div className="flex flex-col gap-y-2">
        {withSearch && searchComponent}
        <Typography.Small className="text-muted-foreground">{t("filters.empty-options")}</Typography.Small>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      {withSearch && searchComponent}
      <ScrollArea className="max-h-62" ref={containerRef}>
        <ToggleGroup
          type="single"
          orientation="vertical"
          spacing={1}
          className="flex-col items-start w-full"
          value={value}
          onValueChange={onChange}
        >
          {isLoading && <Skeleton count={4} />}

          {!isLoading && !!items.length && listHeight > 0 && (
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
