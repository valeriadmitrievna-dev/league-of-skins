import { type FC } from "react";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { SearchIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

const SearchPage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-[320px_1fr] gap-5 p-5 m-auto xl:max-w-360 2xl:max-w-400">
      <div>filters</div>
      <div className="flex flex-col gap-3">
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
        <Outlet />
      </div>
    </div>
  );
};

export default SearchPage;
