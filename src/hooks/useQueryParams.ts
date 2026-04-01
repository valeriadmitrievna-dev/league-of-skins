import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export const useQueryParams = <T extends string>(keys: T[] = []) => {
  const [params, set] = useSearchParams();

  const get = useCallback((key: T) => params.get(key), [params]);

  const update = (key: T, value?: string | null) => {
    set((prev) => {
      const next = new URLSearchParams(prev);

      if (!value || value === "all") next.delete(key);
      else next.set(key, value);

      return next;
    });
  };

  const reset = () => set({});

  const hasActive = useMemo(() => keys.some((key) => !!params.get(key)), [keys, params]);

  return { get, update, reset, hasActive };
};
