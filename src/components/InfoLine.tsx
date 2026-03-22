import type { FC, ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

import { Typography } from "./Typography";

interface InfoLineProps {
  label: string | ReactNode;
  value: string | ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const InfoLine: FC<InfoLineProps> = ({ label, value, className, labelClassName, valueClassName }) => {
  return (
    <div className={cn("flex items-center justify-between gap-x-8", className)}>
      {typeof label === "string" ? <Typography.P className={cn("my-tag", labelClassName)}>{label}</Typography.P> : label}
      {typeof value === "string" ? <Typography.P className={cn("my-tag", valueClassName)}>{value}</Typography.P> : value}
    </div>
  );
};

export default InfoLine;
