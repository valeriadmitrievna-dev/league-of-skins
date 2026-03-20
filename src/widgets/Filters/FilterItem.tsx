import { ChevronDownIcon, XIcon } from "lucide-react";
import type { FC, MouseEventHandler, PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/shared/utils/cn";

interface FilterItemProps extends PropsWithChildren {
  title: string;
  value: string;
  onClear?: () => void;
  defaultOpen?: boolean;
}

const FilterItem: FC<FilterItemProps> = ({ title, value, onClear, children, defaultOpen }) => {
  const clearHandler: MouseEventHandler = (event) => {
    event.stopPropagation();
    onClear?.();
  };

  return (
    <Collapsible defaultOpen={defaultOpen} className="not-last:border-b">
      <CollapsibleTrigger className="group h-10 w-full flex items-center justify-between gap-x-2 relative">
        <span className="text-sm font-medium group-hover:underline uppercase">{title}</span>
        {!!value && <span className="flex size-2 rounded-full bg-primary mr-auto" />}
        <ChevronDownIcon
          className={cn("size-4 text-primary group-data-[state=open]:rotate-180 absolute right-1", {
            "group-hover:hidden": !!value && !!onClear,
          })}
        />
        <Button
          size="icon-xs"
          onClick={clearHandler}
          className={cn("transition-none absolute right-0 opacity-0 md:group-hover:opacity-100", {
            "hidden!": !value || !onClear,
          })}
          variant="lol-secondary"
        >
          <XIcon className="size-4!" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-3">{children}</CollapsibleContent>
    </Collapsible>
  );
};

export default FilterItem;
