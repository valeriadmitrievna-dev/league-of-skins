import type { FC } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/shared/utils/cn";
import type { OptionItem } from "@/types/shared";

interface FilterToggleGroupProps {
  value: string;
  onChange: (value?: string) => void;
  options: OptionItem[];
  className?: string;
  disabled?: boolean;
}

const FilterToggleGroup: FC<FilterToggleGroupProps> = ({ value, onChange, options, className, disabled }) => {
  return (
    <ToggleGroup
      variant="outline"
      // spacing={2}
      type="single"
      value={value}
      onValueChange={onChange}
      className={cn("w-full", className)}
      disabled={disabled}
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} className={cn("grow text-[14px]! font-normal", option.className)} value={option.value}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default FilterToggleGroup;
