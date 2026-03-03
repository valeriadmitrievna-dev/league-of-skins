import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export const useQueryParams = <T extends string>(keys: T[] = []) => {
  const [params, set] = useSearchParams();

  const get = useCallback((key: T) => params.get(key), [params]);

  const update = (key: T, value?: string) => {
    set((prev) => {
      if (!value || value === "all") prev.delete(key);
      else prev.set(key, value);
      return prev;
    });
  };

  const reset = () => set({});

  const hasActive = useMemo(() => keys.some((key) => !!params.get(key)), [keys, params]);

  return { get, update, reset, hasActive };
};
