import { useEffect, type FC } from "react";

import s from "./SearchPage.module.scss";
import { SearchFilters } from "@/widgets/SearchFilters";
import { useGetSkinsQuery } from "@/api";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon, XIcon } from "lucide-react";

const SearchPage: FC = () => {
  const { data } = useGetSkinsQuery({});

  useEffect(() => {
    if (data) {
      console.log("[DEV]", data);
    }
  }, [data]);

  return (
    <div className={s.searchPage}>
      <div className={s.searchPageFilters}>
        <SearchFilters />
      </div>
      <div className={s.searchPageSearch}>
        {/* <Search /> */}
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs">
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className={s.searchPageResults}>results</div>
    </div>
  );
};

export default SearchPage;
