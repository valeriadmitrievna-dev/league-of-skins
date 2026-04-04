import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useGetUserQuery, useGetWishlistQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Typography } from "@/components/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EmptyWishlistOwned from "@/emptystates/EmptyWishlistOwned";
import useShare from "@/hooks/useShare";
import type { ChromaDto } from '@/types/chroma';
import type { SkinDto } from "@/types/skin";
import ChromaCard from '@/widgets/ChromaCard';
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import WishlistInfo from "@/widgets/Wishlist/WishlistInfo";
import WishlistSkeleton from "@/widgets/Wishlist/WishlistSkeleton";

interface DetailsWishlistOwnedPageProps {
  id: string;
}

const DetailsWishlistOwnedPage: FC<DetailsWishlistOwnedPageProps> = ({ id: wishlistId }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { share } = useShare();

  const [showOwned, setShowOwned] = useState(true);

  const toggleShowOwnedHandler = (checked: boolean) => {
    setShowOwned(checked);
  };

  const { data: user } = useGetUserQuery();
  const { data: wishlist, isLoading } = useGetWishlistQuery(
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

  const ownedSkinsSet = useMemo(() => new Set(user?.ownedSkins ?? []), [user?.ownedSkins]);
  const ownedChromasSet = useMemo(() => new Set(user?.ownedChromas ?? []), [user?.ownedChromas]);

  const renderSkin = useCallback(
    (item: unknown, _index: number) => {
      const skin = item as SkinDto;
      const owned = ownedSkinsSet.has(skin.contentId);

      return <SkinCard key={skin.id} data={skin} owned={owned} toggleOwnedButton wishlistId={wishlist?._id} />;
    },
    [wishlist?._id, showOwned, ownedSkinsSet],
  );

   const renderChroma = useCallback(
    (item: unknown, _index: number) => {
      const chroma = item as ChromaDto;
      const owned = ownedChromasSet.has(chroma.contentId);

      return <ChromaCard key={chroma.id} data={chroma} owned={owned} toggleOwnedButton wishlistId={wishlist?._id} />;
    },
    [wishlist?._id, showOwned, ownedChromasSet],
  );

  const skins = useMemo(
    () => (wishlist?.skins ?? []).filter((skin) => (showOwned ? true : !skin.owned)),
    [wishlist, showOwned],
  );

  const chromas = useMemo(
    () => (wishlist?.chromas ?? []).filter((chroma) => (showOwned ? true : !chroma.owned)),
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

      <div className="grid md:grid-cols-[280px_1fr] gap-x-4 gap-y-3">
        <WishlistInfo
          wishlist={wishlist}
          showOwned={showOwned}
          onToogleShowOwned={toggleShowOwnedHandler}
          onShare={shareHandler}
          onDelete={deleteHandler}
        />

        <div className="flex flex-col gap-y-3 w-full overflow-hidden">
          <Tabs defaultValue="skins" className='gap-y-5'>
            <TabsList variant="line" className='border-b w-full justify-start'>
              <TabsTrigger className="px-6 after:bg-primary flex-0" value="skins">
                {t("header.skins")}
              </TabsTrigger>
              <TabsTrigger className="px-6 after:bg-primary flex-0" value="chromas">
                {t("header.chromas")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="skins">
              {!!skins.length && (
                <VirtualizedGrid
                  items={skins}
                  loading={isLoading}
                  overscan={4}
                  render={renderSkin}
                  columnGap={16}
                  rowGap={24}
                />
              )}
              {!skins.length && <EmptyWishlistOwned />}
            </TabsContent>

            <TabsContent value="chromas">
              {!!chromas.length && (
                <VirtualizedGrid
                  items={chromas}
                  loading={isLoading}
                  overscan={4}
                  render={renderChroma}
                  columnGap={16}
                  rowGap={24}
                />
              )}
              {/* {!chromas.length && <EmptyWishlistOwned />} */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default DetailsWishlistOwnedPage;
