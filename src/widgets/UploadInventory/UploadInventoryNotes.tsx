import { Typography } from "@/components/Typography";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

const UploadInventoryNotes: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.H4 className='mb-2'>{t("uploadInventory.notes_title")}</Typography.H4>
      <Typography.P className="mb-1">{t("uploadInventory.notes_manual")}</Typography.P>
      <Typography.P>{t("uploadInventory.notes_safety")}</Typography.P>
    </div>
  );
};

export default UploadInventoryNotes;
