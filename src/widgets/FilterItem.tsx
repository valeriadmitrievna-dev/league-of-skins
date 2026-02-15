import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ComponentProps, FC, MouseEventHandler, PropsWithChildren } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { XIcon } from 'lucide-react';

interface FilterItemProps extends PropsWithChildren, ComponentProps<typeof AccordionPrimitive.Item> {
  title: string;
  value: string;
  hasValue?: boolean;
  onClear?: () => void;
}

const FilterItem: FC<FilterItemProps> = ({ title, value, hasValue, onClear, children, ...accordionItemProps }) => {
  const clearHandler: MouseEventHandler = (event) => {
    event.stopPropagation();
    onClear?.();
  };

  return (
    <AccordionItem value={value} {...accordionItemProps}>
      <AccordionTrigger className="relative py-2 group hover:no-underline">
        <div className="flex items-center gap-x-2 w-full">
          <span className="group-hover:underline">{title}</span>
          {hasValue && <span className="flex size-2 rounded-full bg-blue-500" />}
          {onClear && hasValue === true && (
            <Button
              size="icon-xs"
              onClick={clearHandler}
              className="absolute bg-background! z-5 -right-1 opacity-0 group-hover:opacity-100 hover:bg-muted!"
              variant="ghost"
            >
              <XIcon className='size-4!' />
            </Button>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-y-2">{children}</AccordionContent>
    </AccordionItem>
  );
};

export default FilterItem;
