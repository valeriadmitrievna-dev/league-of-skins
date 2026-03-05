import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileBracesIcon, HardDriveUploadIcon, XIcon } from "lucide-react";
import { useRef, type ChangeEvent, type FC, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface UploadInventoryInputFileProps {
  file: File | undefined;
  onChange: (file: File | undefined) => void;
  onClear?: () => void;
}

const UploadInventoryInputFile: FC<UploadInventoryInputFileProps> = ({ file, onChange, onClear }) => {
  const { t } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    onChange(file);
  };

  const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }

    onClear?.();
  };

  return (
    <>
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="cursor-pointer grow justify-start pl-3! pr-0! overflow-hidden shrink"
      >
        <Label htmlFor="inventory">
          {file ? (
            <>
              <FileBracesIcon className="size-5" />
              <span className="truncate">{file.name}</span>
              <Button size="icon-sm" variant="secondary" className="ml-auto" onClick={clearHandler}>
                <XIcon />
              </Button>
            </>
          ) : (
            <>
              <HardDriveUploadIcon className="size-5" />
              {t("uploadInventory.button_upload_file")}
            </>
          )}
        </Label>
      </Button>
      <Input
        id="inventory"
        type="file"
        ref={inputFileRef}
        accept=".json, application/json"
        className="hidden"
        onChange={changeHandler}
      />
    </>
  );
};

export default UploadInventoryInputFile;
