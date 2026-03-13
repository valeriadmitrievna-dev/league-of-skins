import type { FC } from "react";
import { Typography } from "./Typography";
import { cn } from "@/shared/utils/cn";
import { useTranslation } from "react-i18next";

interface IProps {
  className?: string;
}

const NoResultsState: FC<IProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={cn("flex flex-col gap-3 items-center justify-center", className)}>
      <Typography.H1>👎</Typography.H1>
      <Typography.P>{t("empty.no-skins_search")}</Typography.P>
    </div>
  );
};

export default NoResultsState;
