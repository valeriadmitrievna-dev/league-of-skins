import { useGetOwnedSkinsQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { SkinDto } from '@/types/skin';
import SkinCard from '@/widgets/SkinCard';
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useLayoutEffect, useMemo, useRef, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router';
import { useWindowSize } from "react-use";

const SkinsPage: FC = () => {
  const { i18n } = useTranslation();
  const { data, isLoading } = useGetOwnedSkinsQuery({ lang: i18n.language });
  const { data: ownedSkins, count } = getODataWithDefault(data);

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
    if (windowWidth >= 1536) return 7;
    if (windowWidth >= 1280) return 6;
    return 4;
  }, [windowWidth]);

  const cardHeight = containerWidth > 0 ? (containerWidth / columns) * (20 / 11) : 396;
  const rowCount = Math.ceil(ownedSkins.length / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => cardHeight,
    overscan: 1,
  });

  useLayoutEffect(() => {
    rowVirtualizer.measure();
  }, [cardHeight]);

  return (
    <div ref={parentRef}>
      {isLoading && !count && (
        <div className="grid grid-cols-4 gap-3 xl:grid-cols-6 2xl:grid-cols-7">
          <Skeleton count={20} asChild className="h-auto aspect-11/20" />
        </div>
      )}

      {!isLoading && !count && (
        <Empty className="w-full h-full max-h-120">
          <EmptyHeader>
            <EmptyTitle>No Owned Skins</EmptyTitle>
            <EmptyDescription>You haven't mark any skin as owned.</EmptyDescription>
          </EmptyHeader>
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
                const skin = ownedSkins[skinIndex];
                if (!skin) return null;

                return (
                  <NavLink key={skin.contentId} to={`/${skin.contentId}`}>
                    <SkinCard data={skin as SkinDto} toggleOwnedButton />
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkinsPage;
