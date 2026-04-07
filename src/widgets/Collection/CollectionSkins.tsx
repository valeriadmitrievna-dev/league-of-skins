import { useCallback, type FC, type RefObject } from "react";

import NoResultsState from "@/components/NoResultsState";
import ScrollTop from "@/components/ScrollTop";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/shared/utils/cn";
import type { SkinDto } from "@/types/skin";

import SkinCard from "../SkinCard";
import VirtualizedGrid from "../VirtualizedGrid";

interface CollectionSkinsProps {
  data?: Omit<SkinDto, "skinlines">[];
  loading?: boolean;
  fetching?: boolean;
  initialLoadDone?: boolean;
  hasMore?: boolean;
  loaderRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

const CollectionSkins: FC<CollectionSkinsProps> = ({
  data = [],
  loading,
  fetching,
  initialLoadDone,
  hasMore,
  className,
  loaderRef,
}) => {
  const renderSkin = useCallback((item: unknown, _index: number) => {
    const skin = item as SkinDto;
    return <SkinCard key={skin.id} data={skin} owned="hidden" addToWishlistButton toggleOwnedButton />;
  }, []);

  return (
    <div className={cn("", className)}>
      {!loading && !fetching && data.length === 0 && initialLoadDone && <NoResultsState className="my-30" />}

      <VirtualizedGrid
        items={data}
        loading={!data.length && loading}
        fetching={fetching}
        overscan={4}
        render={renderSkin}
        columnGap={16}
        rowGap={24}
      />
      {!!data && fetching && <Spinner className="mx-auto mt-4 size-8" />}
      {hasMore && <div ref={loaderRef} />}

      <ScrollTop />
    </div>
  );
};

export default CollectionSkins;
