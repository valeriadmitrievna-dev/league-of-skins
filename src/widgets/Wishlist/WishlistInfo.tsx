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
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useGetUserQuery, useUnsubscribeWishlistMutation, useSubscribeWishlistMutation } from "@/api";
import { Typography } from "@/components/Typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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
import WishlistInfoLine from "./WishlistInfoLine";

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

  const [subscribeWishlist, { isLoading: isSubscribeLoading }] = useSubscribeWishlistMutation();
  const [unsubscribeWishlist, { isLoading: isUnsubscribeLoading }] = useUnsubscribeWishlistMutation();

  const isSubscribed = user?.subscriptions?.some((s) => s === wishlist?._id);

  const progressTotal = wishlist.skins.length || 0;
  const progressOwned = wishlist.skins.filter((skin) => skin.owned).length || 0;
  const progressValue = progressTotal > 0 ? (100 * progressOwned) / progressTotal : 0;

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
        <WishlistInfoLine
          icon={<CalendarIcon />}
          description={t("stats.created")}
          title={format(new Date(wishlist.createdAt), "dd.MM.yyyy")}
        />
        <WishlistInfoLine
          icon={<LayoutGridIcon />}
          description={t("stats.elements")}
          title={`${wishlist.skins.length} ${t("shared.skin", { count: wishlist.skins.length })}`}
        />
        <WishlistInfoLine
          icon={<WalletIcon />}
          description={
            <>
              {t("wishlist.price_total")}{" "}
              <span className="hidden md:inline-block">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMarkIcon className="size-3.25 text-foreground/60 cursor-help transform translate-y-0.5" />
                  </TooltipTrigger>
                  <TooltipContent>{t("skin.priceHelper")}</TooltipContent>
                </Tooltip>
              </span>
            </>
          }
          title={
            <>
              {formatNumber(wishlist.price)} <RPIcon />
            </>
          }
        />
        <WishlistInfoLine
          icon={<EyeIcon />}
          description={t("stats.visits")}
          title={`${wishlist.views} ${t("stats.visits_times", { count: wishlist.views })}`}
        />
        <WishlistInfoLine icon={<HeartIcon />} description={t("stats.subscribers")} title={wishlist.subscribers} />
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
            {progressOwned}/{progressTotal}
          </span>
        </FieldLabel>
        <Progress value={progressValue} id="progress" />
        <FieldDescription className="mt-1.5! text-center text-[12px]">
          {Math.round(progressValue)}% {t("wishlist.complete")}
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
                  {t("wishlist.unsubscribe")}
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
