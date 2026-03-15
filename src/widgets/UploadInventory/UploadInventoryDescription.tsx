import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from '@/components/Typography';

const UploadInventoryDescription: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.P className="mb-3">{t("uploadInventory.description")}</Typography.P>
      <Typography.H4 className="mb-2">{t("uploadInventory.howItWorks_title")}</Typography.H4>
      <Typography.P>{t("uploadInventory.howItWorks_text")}</Typography.P>
    </div>
  );
};

export default UploadInventoryDescription;
