import { useEffect, useState, type ComponentProps, type FC } from "react";
import { cn } from "@/shared/utils/cn";
import Skeleton from "./Skeleton";
import { VideoOffIcon } from "lucide-react";

interface VideoProps extends ComponentProps<"video"> {
  //
}

const Video: FC<VideoProps> = ({ src, className, ...props }) => {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  const loadVideo = async () => {
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
    loadVideo();
  }, [src]);

  if (state === "loading") {
    return <Skeleton className={cn("h-auto", className)} />;
  }

  if (state === "error") {
    return (
      <div className={cn("bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center", className)}>
        <VideoOffIcon className="text-neutral-400 dark:text-neutral-600" />
      </div>
    );
  }

  return <video src={src} className={className} {...props} />;
};

export default Video;
