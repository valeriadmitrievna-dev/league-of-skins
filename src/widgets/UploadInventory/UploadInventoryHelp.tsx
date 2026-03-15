import { ExternalLinkIcon } from "lucide-react";
import type { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

import { Typography } from "@/components/Typography";

const UploadInventoryHelp: FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography.H4 className='mb-2'>{t("uploadInventory.help_title")}</Typography.H4>
      <Typography.P className="mb-1">{t("uploadInventory.help_description")}</Typography.P>
      <ul className="list-disc list-inside">
        <li>
          <Trans
            i18nKey="uploadInventory.help_link_form"
            components={[
              <a
                href="https://forms.gle/WpiGodbBcs9cRV7M7"
                target="_blank"
                className="border-b border-dashed border-muted-foreground"
              />,
            ]}
          />
          <ExternalLinkIcon className="size-3 inline ml-1" />
        </li>
        <li>
          <Trans
            i18nKey="uploadInventory.help_link_direct"
            components={[
              <a
                href="https://t.me/+nBzwgyuff9pkMjUy"
                target="_blank"
                className="border-b border-dashed border-muted-foreground"
              />,
            ]}
          />
          <ExternalLinkIcon className="size-3 inline ml-1" />
        </li>
      </ul>
      <Typography.P className="mt-1">{t("uploadInventory.help_extra")}</Typography.P>
    </div>
  );
};

export default UploadInventoryHelp;
