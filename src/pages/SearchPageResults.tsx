import { useLayoutEffect, useMemo, useRef, useState, type FC } from "react";

import Search from "@/components/Search";
import SkinCard from "@/widgets/SkinCard";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "react-use";
import Skeleton from "@/components/Skeleton";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import useSearchPage from "@/hooks/useSearchPage";

const SearchPageResults: FC = () => {
  const { skins, searchInput, searchHandler, clearSearchHandler, fullResetHandler, isLoading, count } = useSearchPage();

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
  }, [isLoading]);

  const columns = useMemo(() => {
    if (windowWidth >= 1536) return 5;
    if (windowWidth >= 1280) return 4;
    return 3;
  }, [windowWidth]);

  const cardHeight = containerWidth > 0 ? (containerWidth / columns) * (20 / 11) : 460;
  const rowCount = Math.ceil(skins.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight,
    overscan: 1,
  });

  useLayoutEffect(() => {
    rowVirtualizer.measure();
  }, [cardHeight]);

  // TODO: add empty

  return (
    <div ref={parentRef} className="flex flex-col gap-3 h-full w-full">
      <Search size="lg" value={searchInput} onSearch={searchHandler} onClear={clearSearchHandler} />

      {isLoading && !count && (
        <div className="grid grid-cols-3 gap-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Skeleton count={10} asChild className="h-auto aspect-11/20" />
        </div>
      )}

      {!isLoading && !count && (
        <Empty className="w-full h-full max-h-120">
          <EmptyHeader>
            <EmptyTitle>No Skins Found</EmptyTitle>
            <EmptyDescription>Your search did not match any skins. Please clear filters to try again.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="justify-center">
            <Button className="cursor-pointer" onClick={fullResetHandler}>
              Reset filters
            </Button>
          </EmptyContent>
        </Empty>
      )}

      {!!count && (
        <div
          style={{
            position: "relative",
            height: rowVirtualizer.getTotalSize(),
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.key}
              className="grid gap-3"
              style={{
                position: "absolute",
                top: virtualRow.start,
                left: 0,
                width: "100%",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => {
                const skinIndex = virtualRow.index * columns + colIndex;
                const skin = skins[skinIndex];
                if (!skin) return null;

                return <SkinCard key={skin.contentId} data={skin} navigatable addToWishlistButton toggleOwnedButton />;
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPageResults;
