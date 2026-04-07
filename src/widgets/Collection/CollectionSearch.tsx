import type { FC } from "react";

import Search from '@/components/Search';
import { ButtonGroup } from '@/components/ui/button-group';
import { cn } from "@/shared/utils/cn";

import { UploadInventory } from '../UploadInventory';

interface CollectionSearchProps {
  value: string;
  onSearch: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const CollectionSearch: FC<CollectionSearchProps> = ({ value, onSearch, disabled, className }) => {
  return (
    <ButtonGroup className={cn("w-full", className)}>
      <ButtonGroup className="flex-1">
        <Search value={value} onSearch={onSearch} disabled={disabled} />
      </ButtonGroup>
      <ButtonGroup>
        <UploadInventory className="h-auto px-5! hidden md:flex" />
      </ButtonGroup>
    </ButtonGroup>
  );
};

export default CollectionSearch;
