/* eslint-disable react-hooks/set-state-in-effect */
import { FileDownIcon, FileExclamationPointIcon } from "lucide-react";
import { useEffect, useMemo, useState, type FC } from "react";
import { Typography } from "./Typography";
import { readLocalFile } from "@/shared/utils/readLocalFile";
import { Spinner } from './ui/spinner';
import Skeleton from './Skeleton';
import { cn } from '@/shared/utils/cn';

interface DownloadFileProps {
  fileName: string;
}

const DownloadFile: FC<DownloadFileProps> = ({ fileName }) => {
  const [file, setFile] = useState<File>();
  const [error, setError] = useState(false);

  const getFile = async () => {
    try {
      const file = await readLocalFile(fileName);
      if (file) {
        setFile(file);
      }
    } catch (error) {
      setError(false);
    }
  };

  const Icon = useMemo(() => {
    if (error) return FileExclamationPointIcon;
    if (file) return FileDownIcon;
    return Spinner;
  }, [file, error]);

  useEffect(() => {
    getFile();
  }, []);

  return (
    <a
      {...(file ? { href: '/' + file.name, download: file.name } : {})}
      className="my-2 flex items-center border w-fit px-2 py-1 pr-3 rounded-md bg-muted gap-x-2"
    >
      <Icon className={cn('size-7', {'text-muted-foreground': !file})} />
      <div>
        {file ? <Typography.Small>league-of-skins-getter.exe</Typography.Small> : <Skeleton className='h-3.5 w-40' />}
        {file ? <Typography.Muted className="text-[10px]">36.7 MB</Typography.Muted> : <Skeleton className='h-2 mt-1 w-10' />}
      </div>
    </a>
  );
};

export default DownloadFile;
