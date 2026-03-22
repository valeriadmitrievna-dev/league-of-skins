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

  const { ref, visible } = useInViewport<HTMLDivElement>();

  useEffect(() => {
    if (visible && !isLoading && !isFetching && totalData.length < totalCount) {
      setPage((page) => page + 1);
    }
  }, [visible]);

  useEffect(() => {
    if (totalData.length < page * size) {
      const { data: skins } = getODataWithDefault(data);

      if (page === 1) {
        setTotalData(skins);
      } else {
        setTotalData((prev) => [...prev, ...skins]);
      }
    }
  }, [data]);

  return {
    ref,
    count: totalCount,
    data: totalData,
    isLoading,
    isFetching,
  };
};
