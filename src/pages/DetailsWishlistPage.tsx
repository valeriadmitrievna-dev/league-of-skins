import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { TFunction } from "i18next";
import { CalendarIcon, EyeIcon, LayoutGridIcon } from "lucide-react";
import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router";

import { useGetWishlistQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import useShare from "@/hooks/useShare";
import type { SkinDto } from "@/types/skin";
import type { WishlistFullDto } from "@/types/wishlist";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import WishlistDeleteModal from "@/widgets/WishlistDeleteModal";
import WishlistEditModal from "@/widgets/WishlistEditModal";

interface WishlistBreadcrumbProps {
  name: string;
  t: TFunction;
}

interface WishlistSidebarProps {
  t: TFunction;
  wishlist: WishlistFullDto;
  showOwned: boolean;
  progress: {
    allSkinsCount: number;
    ownedSkinsCount: number;
    value: number;
  };
  onToogleShowOwned: (checked: boolean) => void;
  onShare: () => void;
  onDelete: () => void;
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailsWishlistPage: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { wishlistId } = useParams<{ wishlistId: string }>();

  const { share } = useShare();

  const [showOwned, setShowOwned] = useState(true);

  const toggleShowOwnedHandler = (checked: boolean) => {
    setShowOwned(checked);
  };

  const {
    data: wishlist,
    isLoading,
    isFetching,
  } = useGetWishlistQuery({ wishlistId: wishlistId || "", lang: i18n.language }, {
    skip: !wishlistId,
  });

  const shareHandler = () => {
    if (!wishlist) return;

    share({
      title: wishlist.name,
      url: `${window.location.origin}/${wishlist.link}`,
    });
  };

  const deleteHandler = () => {
    navigate("/wishlists");
  };

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      return (
        <SkinCard key={skin.id} data={skin} owned={skin.owned} navigatable toggleOwnedButton wishlistId={wishlist?._id} />
      );
    },
    [wishlist?._id, showOwned],
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

  const skins = useMemo(
    () => (wishlist?.skins ?? []).filter((skin) => (showOwned ? true : !skin.owned)),
    [wishlist, showOwned],
  );

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
    <>
      <CustomHead>
        <title>League of Skins | Wishlist</title>
        <meta name="description" content="Your wishlist" />
      </CustomHead>

      <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-8">
        <WishlistSidebar
          t={t}
          wishlist={wishlist}
          progress={progress!}
          showOwned={showOwned}
          onToogleShowOwned={toggleShowOwnedHandler}
          onShare={shareHandler}
          onDelete={deleteHandler}
        />

        <div className="flex flex-col gap-y-3 w-full overflow-hidden">
          <WishlistBreadcrumb t={t} name={wishlist.name} />

          <VirtualizedGrid items={skins} loading={isLoading} fetching={isFetching} overscan={4} render={renderSkin} />
        </div>
      </div>
    </>
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
          <Skeleton className="h-5 w-25" />
        </FieldLabel>
        <Progress value={0} id="progress" />
      </Field>
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </div>
    </div>
    <div className="flex flex-col gap-y-3">
      <Skeleton className="h-5" />
      <VirtualizedGrid items={[]} loading overscan={4} render={() => null} />
    </div>
  </div>
);

const WishlistSidebar: FC<WishlistSidebarProps> = ({
  t,
  wishlist,
  progress,
  showOwned,
  onToogleShowOwned,
  onShare,
  onDelete,
}) => (
  <aside className="my-card flex flex-col gap-y-3 md:sticky top-4">
    <Typography.Large>{wishlist.name}</Typography.Large>

    <div className="py-2 flex flex-col gap-y-3">
      <StatItem
        icon={<CalendarIcon />}
        label={t("stats.created")}
        value={format(new Date(wishlist.createdAt), "d MMMM yyyy", { locale: ru })}
      />
      <StatItem
        icon={<LayoutGridIcon />}
        label={t("stats.elements")}
        value={`${wishlist.skins.length} ${t("shared.skin", { count: wishlist.skins.length })}`}
      />
      <StatItem icon={<EyeIcon />} label={t("stats.visits")} value={`0 ${t("stats.visits_times", { count: 0 })}`} />
    </div>

    <Field>
      <FieldLabel htmlFor="progress">
        <span>{t("stats.progress")}</span>
        <span className="ml-auto">
          {progress.ownedSkinsCount}/{progress.allSkinsCount}
        </span>
      </FieldLabel>
      <Progress value={progress.value} id="progress" />
    </Field>

    <Field orientation="horizontal" className="justify-between">
      <Label htmlFor="show-owned">{t("wishlist.show_owned_skins")}</Label>
      <Checkbox id="show-owned" name="show-owned" checked={showOwned} onCheckedChange={onToogleShowOwned} />
    </Field>

    <div className="flex flex-col gap-y-1">
      <Button onClick={onShare}>{t("wishlist.share")}</Button>
      <WishlistEditModal wishlist={wishlist}>
        <Button variant="outline">{t("wishlist.edit")}</Button>
      </WishlistEditModal>
      <WishlistDeleteModal
        wishlistId={wishlist._id}
        onSubmit={onDelete}
        trigger={({ onOpen }) => (
          <Button variant="ghost" onClick={onOpen}>
            {t("wishlist.delete")}
          </Button>
        )}
      />
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

const WishlistBreadcrumb: FC<WishlistBreadcrumbProps> = ({ t, name }) => (
  <Breadcrumb className="hidden md:flex">
    <BreadcrumbList className="flex-nowrap overflow-hidden">
      <BreadcrumbLink asChild>
        <NavLink to="/wishlists">{t("header.wishlists")}</NavLink>
      </BreadcrumbLink>
      <BreadcrumbSeparator />
      <BreadcrumbPage className="text-ellipsis whitespace-nowrap overflow-hidden">{name}</BreadcrumbPage>
    </BreadcrumbList>
  </Breadcrumb>
);

export default DetailsWishlistPage;
