import type { FC } from "react";
import { useTranslation } from "react-i18next";

import notFoundImg from "@/shared/assets/hmm-thinking.gif";
import { cn } from "@/shared/utils/cn";

import Image from "./Image";
import { Typography } from "./Typography";

interface NoResultsProps {
  className?: string;
}

const NoResultsState: FC<NoResultsProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={cn("flex flex-col gap-3 items-center justify-center", className)}>
      <Image src={notFoundImg} width={90} />
      <Typography.P className="text-2xl font-bold">{t("empty.hmm")}...</Typography.P>
      <Typography.P className="text-lg">{t("empty.no-skins_search")}</Typography.P>
    </div>
  );
};

export default NoResultsState;
