import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetGuestWishlistQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Typography } from "@/components/Typography";
import type { SkinDto } from "@/types/skin";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import WishlistInfo from "@/widgets/Wishlist/WishlistInfo";
import WishlistSkeleton from "@/widgets/Wishlist/WishlistSkeleton";

interface DetailsWishlistGuestPageProps {
  link: string;
}

const DetailsWishlistGuestPage: FC<DetailsWishlistGuestPageProps> = ({ link }) => {
  const { i18n } = useTranslation();
  const { data: wishlist, isLoading } = useGetGuestWishlistQuery({ link, lang: i18n.language });

  const [showOwned, setShowOwned] = useState(true);

  const toggleShowOwnedHandler = (checked: boolean) => {
    setShowOwned(checked);
  };

  const renderSkin = useCallback(
    (item: unknown, _index: number) => {
      const skin = item as SkinDto;
      return <SkinCard key={skin.id} data={skin} owned={skin.owned} />;
    },
    [wishlist?._id, showOwned],
  );

  const skins = useMemo(
    () => (wishlist?.skins ?? []).filter((skin) => (showOwned ? true : !skin.owned)),
    [wishlist, showOwned],
  );

  if (isLoading) {
    return <WishlistSkeleton guest />;
  }

  return (
    <>
      <CustomHead>
        <title>{wishlist?.name ? `League of Skins | ${wishlist.name}` : "League of Skins"}</title>
        <meta name="description" content="Your wishlist" />
      </CustomHead>

      {wishlist ? (
        <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-3">
          <WishlistInfo wishlist={wishlist} showOwned={showOwned} onToogleShowOwned={toggleShowOwnedHandler} guest />

          <div className="flex flex-col gap-y-3 w-full overflow-hidden">
            <VirtualizedGrid items={skins} loading={isLoading} overscan={4} render={renderSkin} columnGap={16} rowGap={24} />
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Typography.Large>Wishlist not found</Typography.Large>
        </div>
      )}
    </>
  );
};

export default DetailsWishlistGuestPage;
