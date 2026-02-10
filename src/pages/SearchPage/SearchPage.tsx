import { useEffect, type FC } from "react";

import s from "./SearchPage.module.scss";
import { SearchFilters } from "@/widgets/SearchFilters";
import { useGetSkinsQuery } from "@/api";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const SearchPage: FC = () => {
  const { t } = useTranslation();
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
        <InputGroup>
          <InputGroupInput placeholder={t("shared.search")} />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton className="cursor-pointer" size="icon-xs">
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
