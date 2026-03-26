import { HeartCrackIcon } from 'lucide-react';
import type { FC } from 'react';
import { NavLink } from 'react-router';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { cn } from '@/shared/utils/cn';

interface EmptyWishlistOwnedProps {
  className?: string;
}

const EmptyWishlistOwned: FC<EmptyWishlistOwnedProps> = ({ className }) => {
  return (
    <Empty className={cn('', className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartCrackIcon />
        </EmptyMedia>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any skins in this wishlist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button asChild>
          <NavLink to="/search/skins">Search skins</NavLink>
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyWishlistOwned;
