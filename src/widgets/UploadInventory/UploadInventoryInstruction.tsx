import type { FC, PropsWithChildren } from "react";

import { Typography } from "@/components/Typography";

interface UploadInventoryInstructionProps extends PropsWithChildren {
  title: string;
}

const UploadInventoryInstruction: FC<UploadInventoryInstructionProps> = ({ title, children }) => {
  return (
    <div>
      <Typography.P className="mb-1 mt-2 font-medium">{title}</Typography.P>
      {children}
    </div>
  );
};

export default UploadInventoryInstruction;
