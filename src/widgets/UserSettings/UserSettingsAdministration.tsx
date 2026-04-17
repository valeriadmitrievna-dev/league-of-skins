import { FileBracesIcon } from "lucide-react";
import { useState, type FC } from "react";

import { useUpdateAppDataMutation, useUploadPricesMutation } from "@/api/queries/base.api";
import InputFile from "@/components/InputFile";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserSettingsAdministration: FC = () => {
  const [updateAppData, { isLoading: isAppDataUpdating }] = useUpdateAppDataMutation();
  const [uploadPrices, { isLoading: isPricesUploading }] = useUploadPricesMutation();

  const [adminKey, setAdminKey] = useState("");
  const [pricesFile, setPricesFile] = useState<File>();

  const changePricesFileHandler = (file?: File) => {
    if (file && file.size && file.type === "application/json") {
      setPricesFile(file);
    }
  };

  const clearPricesFileHandler = () => {
    setPricesFile(undefined);
  };

  const updateAppDataHandler = async () => {
    await updateAppData({ adminKey });
  };

  const uploadPricesHandler = async () => {
    if (!pricesFile) return;
    await uploadPrices(pricesFile);
  };

  return (
    <div className="flex flex-col gap-5">
      <Field className="gap-y-2">
        <Label>Принудительное обновление данных</Label>
        <ButtonGroup>
          <Input
            disabled={isAppDataUpdating}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Введите ключ"
            className="plain-input"
          />
          <Button disabled={isAppDataUpdating || !adminKey.trim().length} onClick={updateAppDataHandler}>
            Обновить
          </Button>
        </ButtonGroup>
      </Field>

      <Field className="gap-y-2">
        <Label>Обновление цен</Label>
        <ButtonGroup>
          <InputFile
            variant="outline"
            file={pricesFile}
            onChange={changePricesFileHandler}
            onClear={clearPricesFileHandler}
            accept=".json, application/json"
            fileIcon={FileBracesIcon}
            disabled={isPricesUploading}
          />
          <Button disabled={!pricesFile || isPricesUploading} onClick={uploadPricesHandler}>
            Обновить
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  );
};

export default UserSettingsAdministration;
