import { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import { useIntersection } from "react-use";

import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { ODataResponse } from "@/types/shared";

type ApiResponse<TItem> = {
  data?: ODataResponse<TItem>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInfiniteScroll = <TRequest extends Record<string, any>, TItem>({
  trigger,
  initialParams,
  pageSize = 30,
  skip = false,
}: {
  trigger: (args: TRequest & { page: number; size: number }) => Promise<ApiResponse<TItem[]>>;
  initialParams: TRequest;
  pageSize?: number;
  skip?: boolean;
}) => {
  const [items, setItems] = useState<TItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevParamsRef = useRef<TRequest>(initialParams);
  const isLoadingRef = useRef(false);

  const intersection = useIntersection(ref as RefObject<HTMLDivElement>, {
    root: null,
    threshold: 0,
  });

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setIsInitialLoadDone(false);
    setTotalCount(undefined);
    setError(null);
  }, []);

  const loadMore = useCallback(
    async (overridePage?: number) => {
      if (isLoadingRef.current || skip || !hasMore) return;

      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const currentAbortController = new AbortController();
      abortControllerRef.current = currentAbortController;

      const currentPage = overridePage ?? page;

      try {
        const res = await trigger({
          ...initialParams,
          page: currentPage,
          size: pageSize,
        });

        if (!isMountedRef.current) return;

        const { data: newItems, count } = getODataWithDefault(res?.data);

        setItems((prev) => {
          const updatedItems = currentPage === 1 ? newItems : [...prev, ...newItems];
          return updatedItems;
        });

        setTotalCount(count);

        const hasNextPage = newItems.length === pageSize && currentPage * pageSize < count;

        setHasMore(hasNextPage);

        if (hasNextPage) {
          setPage(currentPage + 1);
        }
      } catch (e) {
        if (e instanceof Error && e.name === "AbortError") {
          return;
        }

        console.error(e);
        setError(e as Error);
        setHasMore(false);
      } finally {
        if (!isInitialLoadDone) {
          setIsInitialLoadDone(true);
        }
        
        if (isMountedRef.current) {
          setIsLoading(false);
          isLoadingRef.current = false;
        }

        if (abortControllerRef.current === currentAbortController) {
          abortControllerRef.current = null;
        }
      }
    },
    [trigger, initialParams, pageSize, page, skip, hasMore],
  );

  useEffect(() => {
    if (skip) return;

    if (intersection?.isIntersecting && !isLoading && hasMore) {
      loadMore();
    }
  }, [intersection?.isIntersecting, isLoading, hasMore, skip, loadMore, isInitialLoadDone]);

  useEffect(() => {
    if (skip) return;

    const paramsChanged = JSON.stringify(prevParamsRef.current) !== JSON.stringify(initialParams);

    if (paramsChanged) {
      prevParamsRef.current = initialParams;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      reset();
      loadMore(1);
    }
  }, [initialParams, skip, reset, loadMore]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = useCallback(() => {
    if (skip) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    reset();
    loadMore(1);
  }, [skip, reset, loadMore]);

  return {
    items,
    hasMore,
    isLoading,
    loaderRef: ref,
    totalCount,
    isInitialLoadDone,
    error,
    reset,
    refetch,
  };
};
