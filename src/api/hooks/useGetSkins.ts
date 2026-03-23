import { useEffect, useState } from "react";

import { useInViewport } from "@/hooks/useInViewport";
import { getODataWithDefault } from "@/shared/utils/getODataWithDefault";
import type { WithLanguage } from "@/types/shared";
import type { SkinDto } from "@/types/skin";

import { useGetSkinsQuery } from "../queries/data.api";
import type { SkinsRequest } from "../types";

export const useGetSkins = (params: WithLanguage<SkinsRequest>, size: number = 30) => {
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState<SkinDto[]>([]);
  const { data, isLoading, isFetching } = useGetSkinsQuery({ ...params, page, size });
  const { count: totalCount } = getODataWithDefault(data);

  const { ref: loaderRef, visible } = useInViewport<HTMLDivElement>();

  const canLoadMore = totalCount !== undefined ? totalData.length < totalCount : true;

  useEffect(() => {
    if (visible && !isLoading && !isFetching && canLoadMore) {
      setPage((page) => page + 1);
    }
  }, [visible, isLoading, isFetching, canLoadMore]);

  useEffect(() => {
    const { data: skins } = getODataWithDefault(data);

    setTotalData((prev) => {
      const merged = page === 1 ? skins : [...prev, ...skins];
      const map = new Map(merged.map((s) => [s.contentId, s]));
      return Array.from(map.values());
    });
  }, [data, page]);

  useEffect(() => {
    setPage(1);
    setTotalData([]);
  }, [JSON.stringify(params)]);

  return {
    loaderRef,
    count: totalCount,
    data: totalData,
    isLoading,
    isFetching,
  };
};
