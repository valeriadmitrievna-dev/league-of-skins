import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/shared/utils/cn";
import { UploadInventory } from "@/widgets/UploadInventory";

interface EmptyCollectionSkinsProps {
  className?: string;
}

const EmptyCollectionSkins: FC<EmptyCollectionSkinsProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Empty className={cn("w-full h-full max-h-120", className)}>
      <EmptyHeader>
        <EmptyTitle>{t("empty.collection-skins__title")}</EmptyTitle>
        <EmptyDescription>{t("empty.collection-skins__desc")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="gap-y-1">
        <Button size="sm" asChild>
          <NavLink to="/search/skins">{t("empty.goto__search-skins")}</NavLink>
        </Button>
        <Typography.Muted>{t("shared.or")}</Typography.Muted>
        <UploadInventory />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyCollectionSkins;
