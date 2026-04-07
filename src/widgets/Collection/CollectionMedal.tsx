import type { FC } from "react";

import MedalFirstIcon from "@/shared/assets/medal-first.svg?react";
import MedalSecondIcon from "@/shared/assets/medal-second.svg?react";
import MedalThirdIcon from "@/shared/assets/medal-third.svg?react";
import { cn } from "@/shared/utils/cn";

interface CollectionMedalProps {
  place: number;
  className?: string;
}

const CollectionMedal: FC<CollectionMedalProps> = ({ place, className }) => {
  if (place === 1) return <MedalFirstIcon className={cn("size-6 shrink-0", className)} />
  if (place === 2) return <MedalSecondIcon className={cn("size-6 shrink-0", className)} />
  if (place === 3) return <MedalThirdIcon className={cn("size-6 shrink-0", className)} />
};

export default CollectionMedal;
