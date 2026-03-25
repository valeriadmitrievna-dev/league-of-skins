import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router";

import { useGetWishlistQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Typography } from "@/components/Typography";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import useShare from "@/hooks/useShare";
import type { SkinDto } from "@/types/skin";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import WishlistInfo from "@/widgets/Wishlist/WishlistInfo";
import WishlistSkeleton from "@/widgets/Wishlist/WishlistSkeleton";

interface DetailsWishlistOwnedPageProps {
  id: string;
}

const DetailsWishlistOwnedPage: FC<DetailsWishlistOwnedPageProps> = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
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
  } = useGetWishlistQuery(
    { wishlistId: wishlistId || "", lang: i18n.language },
    {
      skip: !wishlistId,
    },
  );

  const shareHandler = () => {
    if (!wishlist) return;

    share({
      title: wishlist.name,
      url: `${window.location.origin}/wishlists/${wishlist.link}`,
    });
  };

  const deleteHandler = () => {
    navigate("/wishlists");
  };

  const renderSkin = useCallback(
    (item: unknown, _index: number) => {
      const skin = item as SkinDto;
      return <SkinCard key={skin.id} data={skin} owned={skin.owned} toggleOwnedButton wishlistId={wishlist?._id} />;
    },
    [wishlist?._id, showOwned],
  );

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
        <title>{wishlist?.name ? `League of Skins | ${wishlist.name}` : "League of Skins"}</title>
        <meta name="description" content="Your wishlist" />
      </CustomHead>

      <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-3">
        <WishlistInfo
          wishlist={wishlist}
          showOwned={showOwned}
          onToogleShowOwned={toggleShowOwnedHandler}
          onShare={shareHandler}
          onDelete={deleteHandler}
        />

        <div className="flex flex-col gap-y-3 w-full overflow-hidden">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList className="flex-nowrap overflow-hidden">
              <BreadcrumbLink asChild>
                <NavLink to="/wishlists">{t("header.wishlists")}</NavLink>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-ellipsis whitespace-nowrap overflow-hidden">{wishlist.name}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <VirtualizedGrid items={skins} loading={isLoading} fetching={isFetching} overscan={4} render={renderSkin} />
        </div>
      </div>
    </>
  );
};

export default DetailsWishlistOwnedPage;
