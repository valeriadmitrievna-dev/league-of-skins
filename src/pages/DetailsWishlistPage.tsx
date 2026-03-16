import { format } from "date-fns";
import { CalendarIcon, EyeIcon, LayoutGridIcon, Share2Icon, SquarePenIcon } from "lucide-react";
import { useCallback, useMemo, type FC } from "react";
import { NavLink, useParams } from "react-router";

import { useGetWishlistQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import useShare from "@/hooks/useShare";
import type { SkinDto } from "@/types/skin";
import type { WishlistFullDto } from '@/types/wishlist';
import EditWishlistModal from "@/widgets/EditWishlistModal";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

interface WishlistBreadcrumbProps {
  name: string;
}

interface WishlistSidebarProps {
  wishlist: WishlistFullDto
  progress: {
    allSkinsCount: number;
    ownedSkinsCount: number;
    value: number;
  };
  onShare: () => void;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailsWishlistPage: FC = () => {
  const { wishlistId } = useParams<{ wishlistId: string }>();
  const { share } = useShare();

  const { data: wishlist, isLoading, isFetching } = useGetWishlistQuery(wishlistId || '', {
    skip: !wishlistId,
  });

  const shareHandler = useCallback(() => {
    if (!wishlist) return;

    share({
      title: wishlist.name,
      url: `${window.location.origin}/${wishlist.link}`,
    });
  }, [wishlist, share]);

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      return (
        <SkinCard
          key={skin.id}
          data={skin}
          owned={skin.owned}
          navigatable
          toggleOwnedButton
          wishlistId={wishlist?._id}
        />
      );
    },
    [wishlist?._id],
  );

  const progress = useMemo(() => {
    if (!wishlist) return null;
    
    const allSkinsCount = wishlist.skins.length;
    const ownedSkinsCount = wishlist.skins.filter((skin) => skin.owned).length;
    const value = allSkinsCount > 0 ? (100 * ownedSkinsCount) / allSkinsCount : 0;

    return {
      allSkinsCount,
      ownedSkinsCount,
      value,
    };
  }, [wishlist]);

  if (!wishlistId) {
    return <div>Invalid wishlist ID</div>;
  }

  if (isLoading) {
    return <WishlistSkeleton />;
  }

  if (!wishlist) {
    return (
      <div className="text-center py-8">
        <Typography.Large>Wishlist not found</Typography.Large>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-8">
      <WishlistSidebar
        wishlist={wishlist}
        progress={progress!}
        onShare={shareHandler}
      />
      
      <div className="flex flex-col gap-y-3">
        <WishlistBreadcrumb name={wishlist.name} />
        
        <VirtualizedGrid
          items={wishlist.skins}
          loading={isLoading}
          fetching={isFetching}
          overscan={4}
          render={renderSkin}
        />
      </div>
    </div>
  );
};

const WishlistSkeleton: FC = () => (
  <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-8">
    <div className="my-card flex flex-col gap-y-3">
      <Skeleton className="h-7" />
      <div className="py-2 flex flex-col gap-y-3">
        <Skeleton asChild count={3} className="h-8" />
      </div>
      <Field className="w-full max-w-sm">
        <FieldLabel htmlFor="progress" className="text-muted-foreground">
          Progress
        </FieldLabel>
        <Progress value={0} id="progress" />
      </Field>
      <div className="flex flex-col gap-y-1">
        <Button disabled>
          <Share2Icon />
          Share
        </Button>
        <Button variant="outline" disabled>
          <SquarePenIcon />
          Edit Details
        </Button>
      </div>
    </div>
    <div className="flex flex-col gap-y-3">
      <Skeleton className="h-5" />
      <VirtualizedGrid items={[]} loading overscan={4} render={() => null} />
    </div>
  </div>
);

const WishlistSidebar: FC<WishlistSidebarProps> = ({ wishlist, progress, onShare }) => (
  <aside className="my-card flex flex-col gap-y-3">
    <Typography.Large>{wishlist.name}</Typography.Large>
    
    <div className="py-2 flex flex-col gap-y-3">
      <StatItem
        icon={<CalendarIcon />}
        label="Created"
        value={format(new Date(wishlist.createdAt), "MMMM d, yyyy")}
      />
      <StatItem
        icon={<LayoutGridIcon />}
        label="Items"
        value={`${wishlist.skins.length} skins`}
      />
      <StatItem
        icon={<EyeIcon />}
        label="Visits"
        value="0 times"
      />
    </div>

    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress">
        <span>Progress</span>
        <span className="ml-auto">
          {progress.ownedSkinsCount}/{progress.allSkinsCount}
        </span>
      </FieldLabel>
      <Progress value={progress.value} id="progress" />
    </Field>

    <div className="flex flex-col gap-y-1">
      <Button onClick={onShare}>
        <Share2Icon />
        Share
      </Button>
      <EditWishlistModal wishlist={wishlist}>
        <Button variant="outline">
          <SquarePenIcon />
          Edit Details
        </Button>
      </EditWishlistModal>
    </div>
  </aside>
);

const StatItem: FC<StatItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <Typography.Muted className="leading-none">{label}</Typography.Muted>
      <Typography.Small>{value}</Typography.Small>
    </div>
  </div>
);

const WishlistBreadcrumb: FC<WishlistBreadcrumbProps> = ({ name }) => (
  <Breadcrumb className="hidden md:flex">
    <BreadcrumbList>
      <BreadcrumbLink asChild>
        <NavLink to="/wishlists">Wishlists</NavLink>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage>{name}</BreadcrumbPage>
    </BreadcrumbList>
  </Breadcrumb>
);

export default DetailsWishlistPage;
