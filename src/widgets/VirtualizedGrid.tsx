import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useLayoutEffect, useMemo, useRef, useState, type FC, type JSX, type ReactNode } from "react";
import { useWindowSize } from "react-use";

import Skeleton from "@/components/Skeleton";
import { BREAKPOINTS } from "@/shared/constants/styles";
import { cn } from "@/shared/utils/cn";

interface VirtualizedGridProps {
  items: unknown[];
  render: (item: unknown, index: number) => ReactNode | JSX.Element;
  loading?: boolean;
  fetching?: boolean;
  emptyState?: ReactNode;

  overscan?: number;
  itemAspectRatio?: [number, number];
  itemKey?: (item: unknown, index: number) => string | number;
  className?: string;
  gridClassName?: string;
  containerClassName?: string;
  estimatedItemHeight?: number;

  responsiveColumns?: Array<{
    minWidth: number;
    columns: number;
  }>;
}

const defaultBreakpoints = [
  { minWidth: BREAKPOINTS["2xl"], columns: 5 },
  { minWidth: BREAKPOINTS.xl, columns: 4 },
  { minWidth: BREAKPOINTS.lg, columns: 3 },
  { minWidth: BREAKPOINTS.md, columns: 2 },
  { minWidth: 0, columns: 2 },
];

const VirtualizedGrid: FC<VirtualizedGridProps> = ({
  items,
  render,
  loading,
  fetching,
  emptyState,

  overscan = 1,
  itemAspectRatio = [20, 11],
  itemKey,
  className,
  gridClassName,
  containerClassName,
  estimatedItemHeight = 400,
  responsiveColumns = defaultBreakpoints,
}) => {
  const itemAspectRatioCN = `aspect-[${itemAspectRatio[1]}/${itemAspectRatio[0]}]`;
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const { width: windowWidth } = useWindowSize();

  useLayoutEffect(() => {
    if (!parentRef.current) return;

    const obs = new ResizeObserver(() => {
      setContainerWidth(parentRef.current!.clientWidth);
    });

    obs.observe(parentRef.current);
    return () => obs.disconnect();
  }, [loading]);

  const columns = useMemo(() => {
    const sorted = [...responsiveColumns].sort((a, b) => b.minWidth - a.minWidth);
    const bp = sorted.find((b) => windowWidth >= b.minWidth);
    return bp?.columns ?? 4;
  }, [responsiveColumns, windowWidth]);

  const cardHeight =
    containerWidth > 0 ? (containerWidth / columns) * (itemAspectRatio[0] / itemAspectRatio[1]) : estimatedItemHeight;

  const rowCount = Math.ceil(items.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight,
    overscan,
  });

  useLayoutEffect(() => {
    rowVirtualizer.measure();
  }, [cardHeight]);

  return (
    <div ref={parentRef} className={cn('', className)}>
      {loading && (
        <div className={cn("grid gap-3", gridClassName)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          <Skeleton count={20} asChild className='h-auto' style={{ aspectRatio: `${itemAspectRatio[1]}/${itemAspectRatio[0]}`}} />
        </div>
      )}

      {!loading && !items.length && emptyState}

      {!loading && !!items.length && (
        <div
          className={containerClassName}
          style={{
            position: "relative",
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className={cn("grid gap-3", gridClassName)}
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                width: "100%",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => {
                const itemIndex = virtualRow.index * columns + colIndex;
                if (itemIndex >= items.length) return null;

                const item = items[itemIndex];
                const key = itemKey ? itemKey(item, itemIndex) : itemIndex;

                return (
                  <div
                    key={key}
                    className={cn(itemAspectRatioCN, { "pointer-events-none animate-pulse": fetching })}
                    style={{ aspectRatio: `${itemAspectRatio[1]}/${itemAspectRatio[0]}` }}
                  >
                    {render(item, itemIndex)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VirtualizedGrid;
