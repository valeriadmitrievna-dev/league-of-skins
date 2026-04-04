import { type FC, type PropsWithChildren } from "react";

import { useRefreshQuery } from "@/api";
import { Spinner } from "@/components/ui/spinner";

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useRefreshQuery();

  if (isLoading)
    return (
      <div className='w-full h-screen flex items-center justify-center bg-background'>
        <Spinner className='size-10 text-primary' />
      </div>
    );

  return <>{children}</>;
};

export default AppProvider;
