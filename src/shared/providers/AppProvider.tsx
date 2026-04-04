import { type FC, type PropsWithChildren } from "react";

import { useRefreshQuery } from "@/api";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useRefreshQuery();

  if (isLoading) return "Loading";

  return <>{children}</>;
};

export default AppProvider;
