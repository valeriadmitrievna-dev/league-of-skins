import { useGetSkinsQuery } from "@/api";
import { useEffect, useMemo } from "react";

const useSearchPage = () => {
  const { data } = useGetSkinsQuery({ championId: 'Nidalee' });

  const { data: skins, count } = useMemo(() => {
    if (data) return { data: data.data, count: data.count };
    else return { data: [], count: 0 }
  }, [data]);

  useEffect(() => {
    if (data) {
      console.log("[DEV]", data);
    }
  }, [data]);

  return { skins: skins.slice(0, 20), count };
};

export default useSearchPage;
