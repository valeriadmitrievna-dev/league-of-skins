import type { FC } from "react";
import { useTranslation } from "react-i18next";

import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/shared/utils/cn";
import type { OptionItem } from "@/types/shared";

interface FilterToggleTagsProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionItem[];
  loading?: boolean;
  className?: string;
}

const FilterToggleTags: FC<FilterToggleTagsProps> = ({ value, onChange, options, loading, className }) => {
  const { t } = useTranslation();

  return (
    <ToggleGroup
      type="single"
      size="sm"
      variant="outline"
      spacing={1}
      className={cn("items-start w-full flex-wrap", className)}
      value={value}
      onValueChange={onChange}
    >
      {loading && <Skeleton count={8} asChild className="w-[30%] h-8" />}
      {!loading && !options.length && (
        <Typography.Small className="text-muted-foreground">{t("filters.empty-options")}</Typography.Small>
      )}
      {!loading &&
        !!options.length &&
        options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className={cn("w-fit h-8 items-center justify-start", option.className)}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
    </ToggleGroup>
  );
};

export default FilterToggleTags;
