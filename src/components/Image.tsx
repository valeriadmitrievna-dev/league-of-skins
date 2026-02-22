import { useEffect, useState, type ComponentProps, type FC } from "react";
import { cn } from "@/lib/utils";
import Skeleton from "./Skeleton";
import { ImageOffIcon } from "lucide-react";

interface ImageProps extends ComponentProps<"img"> {
  //
}

const Image: FC<ImageProps> = ({ src, className, ...props }) => {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  const loadImage = async () => {
    try {
      await fetch(src!);
      setState("loaded");
    } catch (error) {
      setState("error");
    }
  };

  useEffect(() => {
    if (!src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("error");
      return;
    }
    loadImage();
  }, [src]);

  console.log('[DEV]', state);

  if (state === "loading") {
    return <Skeleton className={cn("h-auto", className)} />;
  }

  if (state === "error") {
    return (
      <div className={cn("bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center", className)}>
        <ImageOffIcon className="text-neutral-400 dark:text-neutral-600" />
      </div>
    );
  }

  return <img src={src} className={className} {...props} />;
};

export default Image;
