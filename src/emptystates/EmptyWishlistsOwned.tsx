import { HeartCrackIcon } from 'lucide-react';
import type { FC } from 'react';

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { cn } from '@/shared/utils/cn';
import WishlistCreateModal from '@/widgets/Wishlist/WishlistCreateModal';

interface EmptyWishlistsOwnedProps {
  className?: string;
}

const EmptyWishlistsOwned: FC<EmptyWishlistsOwnedProps> = ({ className }) => {
  return (
    <Empty className={cn('', className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HeartCrackIcon />
        </EmptyMedia>
        <EmptyTitle>No wishlists</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any wishlists yet. Get started by creating
          your first wishlist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <WishlistCreateModal />
      </EmptyContent>
    </Empty>
  )
}

export default EmptyWishlistsOwned;
