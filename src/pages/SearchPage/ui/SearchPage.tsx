import { type FC } from "react";

import { Outlet } from "react-router";
import { SearchFilters } from '@/widgets/SearchFilters';

const SearchPage: FC = () => {
  return (
    <div className="w-full grid grid-cols-[320px_1fr] gap-5 p-5 mx-auto xl:max-w-360 2xl:max-w-400">
      <SearchFilters />
      <Outlet />
    </div>
  );
};

export default SearchPage;
