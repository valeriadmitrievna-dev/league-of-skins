import { Clipboard, FacebookIcon, InstagramIcon } from "lucide-react";
import { useCallback, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

import { useGetWishlistQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { appAuthSelector } from "@/store";
import type { SkinDto } from "@/types/skin";
import EditWishlistModal from "@/widgets/EditWishlistModal";
import SkinCard from "@/widgets/SkinCard";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";

const DetailsWishlistPage: FC = () => {
  // TODO: DetailsSkinPage my-card
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuth = useSelector(appAuthSelector);

  const { wishlistId } = useParams();
  const { data: wishlistInfo, isLoading, isFetching } = useGetWishlistQuery(wishlistId || "");

  const [clipboardState, copyToClipboard] = useCopyToClipboard();
  const wishlistLink = wishlistInfo?.link || "//sefnvosldnjlksnvldj";

  const copyToClickboardHandler = () => {
    copyToClipboard(wishlistLink);

    if (clipboardState.error) {
      toast.error(`Unable to copy value: ${clipboardState.error.message}`);
    } else {
      toast.success(`Copied ${wishlistLink}`);
    }
  };

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      return (
        <SkinCard
          key={skin.id}
          data={skin}
          owned={skin.owned}
          navigatable
          toggleOwnedButton={isAuth}
          wishlistId={wishlistInfo?._id}
        />
      );
    },
    [isAuth, wishlistInfo],
  );

  const pageTitle = wishlistInfo?.name === "__MAIN__" ? t("wishlist.__MAIN__") : wishlistInfo?.name;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <NavLink to="/wishlists">{t("app.wishlists")}</NavLink>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            {isLoading ? <Skeleton className="w-10 h-5" /> : <BreadcrumbPage>{pageTitle}</BreadcrumbPage>}
          </BreadcrumbList>
        </Breadcrumb>

        {!!wishlistInfo && <EditWishlistModal wishlistInfo={wishlistInfo} />}
      </div>

      {isLoading ? (
        <Skeleton className="w-40 h-8 md:h-9 mb-4 mt-2" />
      ) : (
        <Typography.H1 className="text-2xl md:text-3xl font-bold mb-4 mt-2">{pageTitle}</Typography.H1>
      )}

      <section className="w-full md:grid grid-cols-[320px_1fr] gap-5">
        <aside className="my-card mb-8 md:mb-0">
          <Typography.H2 className="text-lg">Share</Typography.H2>
          <InputGroup className="plain-input rounded-sm mt-3">
            <InputGroupInput
              className="transition-none aria-invalid:text-destructive aria-invalid:placeholder-destructive/50!"
              value={wishlistLink}
              disabled
            />
            <InputGroupAddon align="inline-end" className="cursor-pointer" onClick={copyToClickboardHandler}>
              <Clipboard size={16} />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex items-center justify-center gap-3 mt-4">
            <FacebookIcon />
            <InstagramIcon />
          </div>
        </aside>

        <div>
          {!isFetching && !wishlistInfo?.skins?.length && (
            <div className="my-20 flex flex-col gap-4 items-center justify-center">
              <Typography.H3>No skins in wishlist yet</Typography.H3>
              <a href="/search/skins">
                <Button>Search for skins</Button>
              </a>
            </div>
          )}

          <VirtualizedGrid
            items={wishlistInfo?.skins || []}
            loading={isLoading}
            fetching={isFetching}
            overscan={4}
            render={renderSkin}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailsWishlistPage;
