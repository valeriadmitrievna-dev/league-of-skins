import { useCallback, type FC } from "react";
import { useGetWishlistQuery } from "@/api";
import { BREAKPOINTS } from "@/shared/constants/styles";
import VirtualizedGrid from "@/widgets/VirtualizedGrid";
import { NavLink, useParams } from "react-router";
import type { SkinDto } from "@/types/skin";
import { appAuthSelector } from "@/store";
import { useSelector } from "react-redux";
import SkinCard from "@/widgets/SkinCard";
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useTranslation } from "react-i18next";
import { Clipboard, FacebookIcon, InstagramIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";

const DetailsWishlistPage: FC = () => {
  // TODO: DetailsSkinPage my-card
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const isAuth = useSelector(appAuthSelector);

  const { wishlistId } = useParams();
  const { data: wishlistInfo, isLoading, isFetching } = useGetWishlistQuery(wishlistId || "");
  console.log({ wishlistInfo });

  const [clipboardState, copyToClipboard] = useCopyToClipboard();
  const wishlistLink = wishlistInfo?.link || "//sefnvosldnjlksnvldj";
  const copyToClickboardHandler = () => {
    copyToClipboard(wishlistLink);

    if (clipboardState.error) {
      toast.error(`Unable to copy value: ${clipboardState.error.message}`);
    } else {
      toast.success(`Copied ${clipboardState.value}`);
    }
  };

  const renderSkin = useCallback(
    (item: unknown) => {
      const skin = item as SkinDto;
      return <SkinCard key={skin.id} data={skin} navigatable toggleOwnedButton={isAuth} wishlistId={wishlistInfo?._id} />;
    },
    [isAuth, wishlistInfo],
  );

  if (!wishlistInfo) {
    return <></>;
  }

  const pageTitle = wishlistInfo?.name === "__MAIN__" ? t("wishlist.__MAIN__") : wishlistInfo?.name;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <NavLink to="/wishlists">{t("app.wishlists")}</NavLink>
          </BreadcrumbLink>
          <BreadcrumbSeparator />
          <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <Typography.H1 className="text-2xl md:text-3xl font-bold mb-4 mt-2">{pageTitle}</Typography.H1>

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
            items={wishlistInfo?.skins}
            loading={isLoading}
            fetching={isFetching}
            gridClassName="grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            overscan={4}
            responsiveColumns={[
              { minWidth: BREAKPOINTS["2xl"], columns: 6 },
              { minWidth: BREAKPOINTS.xl, columns: 5 },
              { minWidth: BREAKPOINTS.lg, columns: 4 },
              { minWidth: BREAKPOINTS.md, columns: 3 },
              { minWidth: 0, columns: 2 },
            ]}
            render={renderSkin}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailsWishlistPage;
