import type { FC, ReactNode } from "react";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";

interface WishlistInfoLineProps {
  className?: string;
  icon: ReactNode;
  description: string | ReactNode;
  title: string | ReactNode;
}

const WishlistInfoLine: FC<WishlistInfoLineProps> = ({ className, icon, description, title }) => {
  return (
    <Item size="xs" className={className}>
      <ItemMedia variant="icon">{icon}</ItemMedia>
      <ItemContent className="gap-0.5">
        <ItemDescription>{description}</ItemDescription>
        <ItemTitle>{title}</ItemTitle>
      </ItemContent>
    </Item>
  );
};

export default WishlistInfoLine;
