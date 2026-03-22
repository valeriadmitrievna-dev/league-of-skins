import { ImageOffIcon } from "lucide-react";
import { useState, type ComponentProps, type FC } from "react";

import { cn } from "@/shared/utils/cn";

import Skeleton from "./Skeleton";

interface ImageProps extends ComponentProps<"img"> {
  pulseLoading?: boolean;
}

const Image: FC<ImageProps> = ({ src, className, style, pulseLoading = true, ...props }) => {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      <img
        src={src}
        className={className}
        onLoadStart={() => setState("loading")}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        style={{ display: state === "loading" || state === "error" ? "none" : "block", ...style }}
        {...props}
      />

      {state === "error" && (
        <div className={cn("bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center", className)}>
          <ImageOffIcon className="text-neutral-400 dark:text-neutral-600" />
        </div>
      )}

      {state === "loading" && <Skeleton pulse={pulseLoading} className={cn("h-auto", className)} style={style} />}
    </>
  );
};

export default Image;
