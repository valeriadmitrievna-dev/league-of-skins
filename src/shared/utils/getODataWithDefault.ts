import type { ODataResponse } from '@/types/shared';

export const getODataWithDefault = <T>(odata: ODataResponse<T> | undefined) => {
  if (!odata) return { data: [] as T, count: 0 };
  else return { data: odata.data, count: odata.count };
};
