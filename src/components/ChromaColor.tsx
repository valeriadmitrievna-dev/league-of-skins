import { cn } from "@/shared/utils/cn";
import type { FC } from "react";

interface ChromaColorProps {
  colors: string[];
  className?: string;
  onClick?: () => void;
}

const ChromaColor: FC<ChromaColorProps> = ({ colors, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "size-5 rotate-45 rounded-full overflow-hidden flex gap-px bg-background border",
        { "cursor-pointer": !!onClick },
        className,
      )}
    >
      <div className="size-full" style={{ background: colors[0] }} />
      {colors.length > 1 && <div className="size-full" style={{ background: colors[1] }} />}
    </div>
  );
};

export default ChromaColor;
