import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useGetGuestWishlistQuery, useGetUserQuery } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Typography } from "@/components/Typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appAuthSelector } from "@/store/app/app.selectors";
import type { ChromaDto } from "@/types/chroma";
import type { SkinDto } from "@/types/skin";
import ChromaCard from "@/widgets/ChromaCard";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import WishlistInfo from "@/widgets/Wishlist/WishlistInfo";
import WishlistSkeleton from "@/widgets/Wishlist/WishlistSkeleton";

interface DetailsWishlistGuestPageProps {
  link: string;
}

const DetailsWishlistGuestPage: FC<DetailsWishlistGuestPageProps> = ({ link }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, { skip: !isAuth });

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

  const renderChroma = useCallback(
    (item: unknown, _index: number) => {
      const chroma = item as ChromaDto;
      return <ChromaCard key={chroma.id} data={chroma} owned={chroma.owned} />;
    },
    [wishlist?._id, showOwned],
  );

  const skins = useMemo(
    () => (wishlist?.skins ?? []).filter((skin) => (showOwned ? true : !skin.owned)),
    [wishlist, showOwned],
  );

  const chromas = useMemo(
    () => (wishlist?.chromas ?? []).filter((chroma) => (showOwned ? true : !chroma.owned)),
    [wishlist, showOwned],
  );

  useEffect(() => {
    if (user && wishlist && wishlist.user._id === user._id) {
      navigate("/wishlists/" + wishlist._id);
    }
  }, [user, wishlist]);

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
        <div className="grid md:grid-cols-[280px_1fr] gap-x-4 gap-y-3">
          <WishlistInfo wishlist={wishlist} showOwned={showOwned} onToogleShowOwned={toggleShowOwnedHandler} guest />

          <div className="flex flex-col gap-y-3 w-full overflow-hidden">
            <Tabs defaultValue="skins" className="gap-y-5">
              <TabsList variant="line" className="border-b w-full justify-start">
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
                {/* {!skins.length && <EmptyWishlistOwned />} */}
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
      ) : (
        <div className="text-center py-8">
          <Typography.Large>Wishlist not found</Typography.Large>
        </div>
      )}
    </>
  );
};

export default DetailsWishlistGuestPage;
