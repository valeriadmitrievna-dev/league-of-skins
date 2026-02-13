import { useLayoutEffect, useMemo, useRef, useState, type FC } from "react";

import { useSearchPage } from "../model";
import { NavLink } from "react-router";
import Search from "@/components/Search";
import SkinCard from "@/widgets/SkinCard";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useWindowSize } from "react-use";

const SearchPageResults: FC = () => {
  const { skins, searchInput, searchHandler, clearSearchHandler } = useSearchPage();

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
  }, []);

  const columns = useMemo(() => {
    if (windowWidth >= 1536) return 5;
    if (windowWidth >= 1280) return 4;
    return 3;
  }, [windowWidth]);

  const cardHeight = containerWidth > 0 ? (containerWidth / columns) * (20 / 11) : 400;
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

              return (
                <NavLink key={skin.contentId} to={`/${skin.contentId}`}>
                  <SkinCard data={skin} />
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPageResults;
