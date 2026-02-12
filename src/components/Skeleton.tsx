import { cn } from "@/lib/utils";
import type { ComponentProps, FC } from "react";

interface SkeletonProps extends ComponentProps<"div"> {
  rounded?: boolean;
  count?: number;
  asChild?: boolean;
}

const SkeletonItem: FC<SkeletonProps> = ({ rounded, className, ...props }) => {
  return (
    <div
      className={cn("w-full rounded-sm h-6 animate-pulse bg-neutral-200 dark:bg-neutral-800", className, {
        ["rounded-full"]: rounded,
      })}
      {...props}
    ></div>
  );
};

const Skeleton: FC<SkeletonProps> = ({ count = 1, asChild, ...props }) => {
  if (count > 1 && !asChild) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: count }, () => (
          <SkeletonItem {...props} />
        ))}
      </div>
    );
  }

  return Array.from({ length: count }, () => <SkeletonItem {...props} />);
};

export default Skeleton;
