import { useUploadInventoryMutation } from "@/api";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/shared/utils/cn";
import { CloudAlertIcon, CloudCheckIcon, CloudUploadIcon } from "lucide-react";
import { useMemo, useState, type FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import UploadInventoryInstruction from "./UploadInventoryInstruction";
import DownloadFile from "@/components/DownloadFile";
import UploadInventoryDescription from "./UploadInventoryDescription";
import UploadInventoryHelp from "./UploadInventoryHelp";
import UploadInventoryNotes from "./UploadInventoryNotes";
import UploadInventoryInputFile from "./UploadInventoryInputFile";

const UploadInventory: FC = () => {
  const { t } = useTranslation();

  const [file, setFile] = useState<File>();
  const [uploadInventory, { isLoading, data, isError, reset }] = useUploadInventoryMutation();

  const changeInventoryFileHandler = (file?: File) => {
    if (file && file.size && file.type === "application/json") {
      setFile(file);
    }
  };

  const clearInventoryFileHandler = () => {
    setFile(undefined);
    reset();
  };

  const uploadInventoryHandler = async () => {
    if (file) {
      await uploadInventory(file);
    }
  };

  const UploadButtonIcon = useMemo(() => {
    if (isLoading) return Spinner;
    if (isError) return CloudAlertIcon;
    if (data) return CloudCheckIcon;
    return CloudUploadIcon;
  }, [data, isLoading, isError]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <CloudUploadIcon />
          {t("uploadInventory.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl!">
        <DialogHeader>
          <Typography.H3>{t("uploadInventory.title")}</Typography.H3>
        </DialogHeader>
        <div className="w-full overflow-hidden">
          <UploadInventoryDescription />
          <Separator className="my-3" />
          <Typography.H4 className="mb-1">{t("uploadInventory.steps_title")}</Typography.H4>
          <UploadInventoryInstruction title={t("uploadInventory.steps_download")}>
            <Typography.P>
              <Trans i18nKey="uploadInventory.steps_download_note" components={{ code: <Typography.Code /> }} />
            </Typography.P>
            <DownloadFile fileName="league-of-skins-getter.exe" />
          </UploadInventoryInstruction>
          <UploadInventoryInstruction title={t("uploadInventory.steps_run")}>
            <Typography.P className="font-medium px-2 py-1 rounded-md bg-chart-5/30 flex gap-x-2">
              {t("uploadInventory.steps_run_note")}
            </Typography.P>
          </UploadInventoryInstruction>
          <UploadInventoryInstruction title={t("uploadInventory.steps_file")}>
            <Typography.P>
              <Trans i18nKey="uploadInventory.steps_file_note" components={{ code: <Typography.Code /> }} />
            </Typography.P>
          </UploadInventoryInstruction>
          <UploadInventoryInstruction title={t("uploadInventory.steps_upload")}>
            <Typography.P>
              <Trans i18nKey="uploadInventory.steps_upload_note" components={{ code: <Typography.Code /> }} />
            </Typography.P>
          </UploadInventoryInstruction>
          <div className="flex items-center gap-x-1 mt-2 mb-2 w-full">
            <UploadInventoryInputFile
              file={file}
              onChange={changeInventoryFileHandler}
              onClear={clearInventoryFileHandler}
            />
            {!!file && (
              <>
                <Button
                  size="sm"
                  onClick={uploadInventoryHandler}
                  disabled={isLoading}
                  {...(isError ? { variant: "destructive" } : {})}
                  className={cn({
                    "bg-lime-600 pointer-events-none": !!data && !isError,
                  })}
                >
                  <UploadButtonIcon className="size-5" />
                  {data && !isError ? t("uploadInventory.button_success") : t("uploadInventory.button_upload")}
                </Button>
              </>
            )}
          </div>
          {isError && <Typography.Small className="text-destructive">{t("uploadInventory.error_upload")}</Typography.Small>}
          <Separator className="my-3" />
          <UploadInventoryNotes />
          <Separator className="my-3" />
          <UploadInventoryHelp />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInventory;
