import { type FC } from "react";

import { Outlet } from "react-router";
import { SearchFilters } from "@/widgets/SearchFilters";
// import { MegaphoneIcon } from "lucide-react";

const SearchPage: FC = () => {
  return (
    <div className="w-full grid grid-cols-[320px_1fr] gap-5 p-5 mx-auto xl:max-w-360 2xl:max-w-400">
      <div className="flex flex-col gap-y-4">
        {/* <div className="border border-dashed rounded-md border-foreground/25 text-neutral-300 dark:text-neutral-600 h-36 flex flex-col items-center justify-center gap-y-2">
          <MegaphoneIcon />
          <span>Ad place</span>
        </div> */}
        <SearchFilters />
      </div>
      <Outlet />
    </div>
  );
};

export default SearchPage;
