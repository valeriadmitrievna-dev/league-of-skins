import { FrownIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface EmptyDetailsSkinProps {
  className?: string;
}

const EmptyDetailsSkin: FC<EmptyDetailsSkinProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FrownIcon />
        </EmptyMedia>
        <EmptyTitle>{t("empty.details-skin__title")}</EmptyTitle>
        <EmptyDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, soluta?</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" asChild>
          <NavLink to="/search/skins">{t("empty.goto__search-skins")}</NavLink>
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyDetailsSkin;
