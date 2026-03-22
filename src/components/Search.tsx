import { SearchIcon, XIcon } from "lucide-react";
import type { ChangeEvent, ComponentProps, FC } from "react";
import { useTranslation } from "react-i18next";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { cn } from "@/shared/utils/cn";

type SearchSize = "default" | "sm" | "lg";

interface SearchProps extends Omit<ComponentProps<"input">, "size"> {
  size?: SearchSize;
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

const Search: FC<SearchProps> = ({ size, onSearch, onClear, className, ...inputProps }) => {
  const { t } = useTranslation();

  const getGroupClassName = (size?: SearchSize) => {
    if (size === "lg") return "h-12 px-1";
    if (size === "sm") return "h-8";
    else return "h-10";
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch?.(event.target.value);
  };

  const clearHandler = () => {
    onSearch?.("");
    onClear?.();
  };

  return (
    <InputGroup className={cn(getGroupClassName(size), "group border-foreground/15", className)}>
      <InputGroupInput
        placeholder={t("shared.search")}
        className="focus:placeholder:text-primary/50"
        {...inputProps}
        onChange={changeHandler}
      />
      <InputGroupAddon>
        <SearchIcon className="group-focus-within:text-primary transition-colors" />
      </InputGroupAddon>
      {inputProps.value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={clearHandler}>
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

export default Search;
