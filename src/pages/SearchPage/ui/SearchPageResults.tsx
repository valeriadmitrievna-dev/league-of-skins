import { type FC } from "react";

import { useSearchPage } from "../model";
import { NavLink } from "react-router";
import Search from "@/components/Search";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import SkinCard from "@/widgets/SkinCard";
import Skeleton from '@/components/Skeleton';

const SearchPageResults: FC = () => {
  const { skins, count, isLoading, searchInput, searchHandler, clearSearchHandler, fullResetHandler } = useSearchPage();

  return (
    <div className="flex flex-col gap-3 h-full w-full">
      <Search size="lg" value={searchInput} onSearch={searchHandler} onClear={clearSearchHandler} />

      <div className={count ? "grid grid-cols-3 gap-3 xl:grid-cols-4 2xl:grid-cols-5" : "h-full"}>
        {isLoading && <Skeleton count={10} asChild className='h-auto aspect-11/20' />}
        {!count && !isLoading && (
          <Empty className="w-full h-full max-h-120">
            <EmptyHeader>
              <EmptyTitle>No Skins Found</EmptyTitle>
              <EmptyDescription>Your search did not match any skins. Please clear filters to try again.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="justify-center">
              <Button className="cursor-pointer" onClick={fullResetHandler}>
                Reset filters
              </Button>
            </EmptyContent>
          </Empty>
        )}
        {!!count &&
          !isLoading &&
          skins.map((skin) => (
            <NavLink key={skin.contentId} to={`/${skin.id}`}>
              <SkinCard data={skin} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SearchPageResults;
