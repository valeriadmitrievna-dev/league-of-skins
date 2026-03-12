import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";
import { FunnelIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

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
        <FunnelIcon size={16} />
        <span className="font-medium text-base">{title ?? t("filters.title")}</span>
      </p>
      {!!onReset && (
        <Button size="xs" onClick={onReset} className="rounded-sm">
          {t("filters.reset")}
        </Button>
      )}
    </div>
  );
};

export default FilterPanelTitle;
