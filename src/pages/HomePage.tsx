import type { FC } from "react";

import CustomHead from "@/components/CustomMetaHead";
import Skeleton from "@/components/Skeleton";

const HomePage: FC = () => {
  return (
    <>
      <CustomHead>
        <title>League of Skins</title>
        <meta name="description" content="Tool for collecting LoL skins wishlists" />
      </CustomHead>

      <Skeleton className="h-full" />

      <div className="flex gap-3 mt-20">
        <Skeleton className="h-50" />
        <Skeleton className="h-50" />
        <Skeleton className="h-50" />
      </div>

      <div className="flex gap-3 mt-20">
        <Skeleton className="h-100" />

        <div>
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-150 mt-3" />
          <Skeleton className="w-150 mt-3" />
          <Skeleton className="w-150 mt-3" />
          <Skeleton className="w-150 mt-3" />
          <Skeleton className="w-100 mt-3" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
