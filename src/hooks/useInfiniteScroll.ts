import { useEffect, useRef, useState, type RefObject } from "react";
import { useIntersection } from "react-use";

import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { ODataResponse } from "@/types/shared";

type ApiResponse<TItem> = {
  data?: ODataResponse<TItem>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInfiniteScroll<TRequest extends Record<string, any>, TItem>({
  trigger,
  initialParams,
  pageSize = 30,
}: {
  trigger: (args: TRequest & { page: number; size: number }) => Promise<ApiResponse<TItem[]>>;
  initialParams: TRequest;
  pageSize?: number;
}) {
  const [items, setItems] = useState<TItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number | undefined>();

  const ref = useRef<HTMLDivElement | null>(null);

  const intersection = useIntersection(ref as RefObject<HTMLDivElement>, {
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  const loadMore = async (overridePage?: number) => {
    if (isLoading) return;

    setIsLoading(true);

    const currentPage = overridePage ?? page;
    try {
      const res = await trigger({
        ...initialParams,
        page: currentPage,
        size: pageSize,
      });

      const { data: newItems, count } = getODataWithDefault(res?.data);

      setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
      setTotalCount(count);

      const nextHasMore = newItems.length === pageSize && page * pageSize < count;

      setHasMore(nextHasMore);

      if (nextHasMore) {
        setPage((p) => p + 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger loading when sentinel becomes visible
  useEffect(() => {
    if (intersection?.isIntersecting && !isLoading) {
      loadMore();
    }
  }, [intersection?.isIntersecting, isLoading]);

  // Reset when params change
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    loadMore(1);
  }, [initialParams]);

  return {
    items,
    hasMore,
    isLoading,
    loaderRef: ref,
    totalCount,
  };
}
