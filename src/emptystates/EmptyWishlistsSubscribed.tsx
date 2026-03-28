import { HeartCrackIcon } from "lucide-react";
import type { FC } from "react";

import { Typography } from "@/components/Typography";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { cn } from "@/shared/utils/cn";

interface EmptyWishlistsSubscribedProps {
  className?: string;
}

const EmptyWishlistsSubscribed: FC<EmptyWishlistsSubscribedProps> = ({ className }) => {
  return (
    <Empty className={cn("", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartCrackIcon />
        </EmptyMedia>
        <EmptyTitle>No wishlists</EmptyTitle>
        <EmptyDescription>You are not subscribed to any wishlists yet</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Typography.Small>Search some... 👇</Typography.Small>
      </EmptyContent>
    </Empty>
  );
};

export default EmptyWishlistsSubscribed;
