// import { SlidersHorizontalIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";

interface FilterPanelTitleProps {
  title?: string;
  onReset?: false | (() => void);
  className?: string;
}

const FilterPanelTitle: FC<FilterPanelTitleProps> = ({ title, onReset, className }) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex justify-between items-center",
        className,
      )}
    >
      <p className="flex items-center gap-2">
        {/* <SlidersHorizontalIcon className='size-6' /> */}
        <span className="text-base font-black uppercase tracking-wider">{title ?? t("filters.title")}</span>
      </p>
      {!!onReset && (
        <Button size="xs" onClick={onReset} variant="destructive">
          {t("filters.reset")}
        </Button>
      )}
    </div>
  );
};

export default FilterPanelTitle;
