import { format } from "date-fns";
import {
  CalendarIcon,
  CircleQuestionMarkIcon,
  EyeIcon,
  HeartIcon,
  LayoutGridIcon,
  LockIcon,
  LockOpenIcon,
  WalletIcon,
} from "lucide-react";
import { useMemo, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetUserQuery, useWishlistSubscribeMutation, useWishlistUnsubscribeMutation } from "@/api";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RPIcon from "@/shared/assets/riot-points-icon.svg?react";
import { formatNumber } from "@/shared/utils/formatNumber";
import { appAuthSelector } from "@/store";
import type { WishlistFullDto } from "@/types/wishlist";

import WishlistDeleteModal from "./WishlistDeleteModal";
import WishlistEditModal from "./WishlistEditModal";

interface WishlistInfoProps {
  wishlist: WishlistFullDto;
  showOwned: boolean;
  onToogleShowOwned: (checked: boolean) => void;
  onShare?: () => void;
  onDelete?: () => void;
  guest?: boolean;
}

const WishlistInfo: FC<WishlistInfoProps> = ({ wishlist, showOwned, onDelete, onShare, onToogleShowOwned, guest }) => {
  const { t } = useTranslation();

  const isAuth = useSelector(appAuthSelector);
  const { data: user } = useGetUserQuery(undefined, { skip: !isAuth });
  console.log({ user });
  const [subscribeWishlist, { isLoading: isSubscribeLoading }] = useWishlistSubscribeMutation();
  const [unsubscribeWishlist, { isLoading: isUnsubscribeLoading }] = useWishlistUnsubscribeMutation();

  const isSubscribed = user?.subscriptions?.some((s) => s === wishlist?._id);

  const progress = useMemo(() => {
    if (!wishlist) return { total: 0, owned: 0, value: 0 };

    const total = wishlist.skins.length;
    const owned = wishlist.skins.filter((skin) => skin.owned).length;
    const value = total > 0 ? (100 * owned) / total : 0;

    return {
      total,
      owned,
      value,
    };
  }, [wishlist]);

  const subscribeHandler = () => {
    subscribeWishlist(wishlist._id);
  };
  const unsubscribeHandler = () => {
    unsubscribeWishlist(wishlist._id);
  };

  return (
    <aside className="my-card flex flex-col gap-y-3 md:sticky top-4 pb-2 border-b">
      <Badge variant={wishlist.private ? "destructive" : "default"}>
        {wishlist.private ? <LockIcon /> : <LockOpenIcon />}
        {t(`wishlist.private_${wishlist.private}`)}
      </Badge>

      <Typography.Large>{wishlist.name}</Typography.Large>

      <div className="py-2 flex flex-col gap-y-3">
        <Item size="xs">
          <ItemMedia variant="icon">
            <CalendarIcon />
          </ItemMedia>
          <ItemContent className="gap-0.5">
            <ItemDescription>{t("stats.created")}</ItemDescription>
            <ItemTitle>{format(new Date(wishlist.createdAt), "dd.MM.yyyy")}</ItemTitle>
          </ItemContent>
        </Item>
        <Item size="xs">
          <ItemMedia variant="icon">
            <LayoutGridIcon />
          </ItemMedia>
          <ItemContent className="gap-0.5">
            <ItemDescription>{t("stats.elements")}</ItemDescription>
            <ItemTitle>{`${wishlist.skins.length} ${t("shared.skin", { count: wishlist.skins.length })}`}</ItemTitle>
          </ItemContent>
        </Item>
        <Item size="xs">
          <ItemMedia variant="icon">
            <WalletIcon />
          </ItemMedia>
          <ItemContent className="gap-0.5">
            <ItemDescription className="flex items-baseline gap-2">
              {t("wishlist.price_total")}{" "}
              <span className="hidden md:block">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMarkIcon className="size-3.25 text-foreground/60 cursor-help transform translate-y-0.5" />
                  </TooltipTrigger>
                  <TooltipContent>{t("skin.priceHelper")}</TooltipContent>
                </Tooltip>
              </span>
            </ItemDescription>
            <ItemTitle>
              {formatNumber(wishlist.price)} <RPIcon />
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item size="xs">
          <ItemMedia variant="icon">
            <EyeIcon />
          </ItemMedia>
          <ItemContent className="gap-0.5">
            <ItemDescription>{t("stats.visits")}</ItemDescription>
            <ItemTitle>{`${wishlist.views} ${t("stats.visits_times", { count: wishlist.views })}`}</ItemTitle>
          </ItemContent>
        </Item>

        <Item size="xs">
          <ItemMedia variant="icon">
            <HeartIcon />
          </ItemMedia>
          <ItemContent className="gap-0.5">
            <ItemDescription>Subscribers</ItemDescription>
            <ItemTitle>{wishlist.subscribers}</ItemTitle>
          </ItemContent>
        </Item>
      </div>

      {!!wishlist.skins.filter((skin) => skin.owned).length && (
        <Field orientation="horizontal" className="justify-between my-2">
          <Label htmlFor="show-owned">{t("wishlist.show_owned_skins")}</Label>
          <Checkbox id="show-owned" name="show-owned" checked={showOwned} onCheckedChange={onToogleShowOwned} />
        </Field>
      )}

      <Field className="block">
        <FieldLabel htmlFor="progress" className="mb-2">
          <span>{t("stats.progress")}</span>
          <span className="ml-auto">
            {progress.owned}/{progress.total}
          </span>
        </FieldLabel>
        <Progress value={progress.value} id="progress" />
        <FieldDescription className="mt-1.5! text-center text-[12px]">
          {Math.round(progress.value)}% {t("wishlist.complete")}
        </FieldDescription>
      </Field>

      <div className="flex flex-col gap-y-2">
        {!guest && (
          <>
            {!wishlist.private && <Button onClick={onShare}>{t("wishlist.share")}</Button>}
            <WishlistEditModal wishlist={wishlist}>
              <Button variant="outline">{t("wishlist.edit")}</Button>
            </WishlistEditModal>
            <WishlistDeleteModal
              wishlistId={wishlist._id}
              onSubmit={onDelete}
              trigger={({ onOpen }) => (
                <Button variant="ghost" onClick={onOpen} className="hover:bg-destructive!">
                  {t("wishlist.delete")}
                </Button>
              )}
            />
          </>
        )}

        {guest && (
          <>
            {isSubscribed ? (
              <Button disabled={isUnsubscribeLoading} onClick={unsubscribeHandler} variant="destructive">
                <span className="relative">
                  {isUnsubscribeLoading && <Spinner className="absolute -start-6 -translate-y-1/2 top-[50%]" />}
                  Unsubscribe
                </span>
              </Button>
            ) : (
              <Button disabled={isSubscribeLoading} onClick={subscribeHandler}>
                <span className="relative">
                  {isSubscribeLoading && <Spinner className="absolute -start-6 -translate-y-1/2 top-[50%]" />}
                  {t("wishlist.subscribe")}
                </span>
              </Button>
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default WishlistInfo;
