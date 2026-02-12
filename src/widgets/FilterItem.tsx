import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FC, PropsWithChildren } from "react";

interface FilterItemProps extends PropsWithChildren {
  title: string;
  value: string;
  hasValue?: boolean;
  onClear?: () => void;
}

const FilterItem: FC<FilterItemProps> = ({ title, value, hasValue, children }) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="py-2 cursor-pointer">
        <div className="flex items-center gap-x-2">
          <span>{title}</span>
          {hasValue && <span className="flex size-2 rounded-full bg-blue-500" />}
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-y-2">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterItem;
