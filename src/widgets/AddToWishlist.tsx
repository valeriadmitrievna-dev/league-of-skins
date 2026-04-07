import { isEqual } from "lodash";
import { CircleMinusIcon, CirclePlusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

import { useGetWishlistsQuery, useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/shared/utils/cn";
import { appAddChromasWaitingSelector, appAddSkinsWaitingSelector, appAuthSelector } from "@/store/app/app.selectors";
import { setAddChromasWaiting, setAddSkinsWaiting } from "@/store/app/app.slice";
import type { WishlistDto } from "@/types/wishlist";

import WishlistCreateModal from "./Wishlist/WishlistCreateModal";

interface AddToWishlistLineProps {
  wishlist: WishlistDto;
  skinContentIds?: string[];
  chromaContentIds?: string[];
}

interface AddToWishlistProps {
  trigger: (options: {
    openState: boolean;
    onOpen: () => void;
    isSkinInWishlist: boolean;
    isChromaInWishlist: boolean;
  }) => ReactNode;

  skinName?: string;
  skinContentIds?: string[];

  chromaName?: string;
  chromaContentIds?: string[];
}

const AddToWishlistLine: FC<AddToWishlistLineProps> = ({ wishlist, skinContentIds = [], chromaContentIds = [] }) => {
  const { t } = useTranslation();

  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const addToExistingWishlist = async () => {
    await updateWishlist({ wishlistId: wishlist._id, body: { addSkinIds: skinContentIds, addChromaIds: chromaContentIds } });

    if (skinContentIds.length) {
      if (skinContentIds.length === 1) {
        toast.success("Образ добавлен в вишлист");
      } else if (skinContentIds.length > 1) {
        toast.success("Образы добавлены в вишлист");
      }
    }

    if (chromaContentIds.length) {
      if (chromaContentIds.length === 1) {
        toast.success("Цветовая схема добавлена в вишлист");
      } else if (chromaContentIds.length > 1) {
        toast.success("Цветовые схемы добавлены в вишлист");
      }
    }
  };

  const removeFromExistingWishlist = async () => {
    await updateWishlist({
      wishlistId: wishlist._id,
      body: { removeSkinIds: skinContentIds, removeChromaIds: chromaContentIds },
    });

    if (skinContentIds.length) {
      if (skinContentIds.length === 1) {
        toast.success("Образ удален из вишлиста");
      } else {
        toast.success("Образы удалены из вишлиста");
      }
    }

    if (chromaContentIds.length) {
      if (chromaContentIds.length === 1) {
        toast.success("Цветовая схема удалена из вишлиста");
      } else if (chromaContentIds.length > 1) {
        toast.success("Цветовые схемы удалены из вишлиста");
      }
    }
  };

  const isSkinInWishlist = skinContentIds.every((skinContentId) => wishlist.skins.includes(skinContentId));
  const isChromaInWishlist = chromaContentIds.every((chromaContentId) => wishlist.chromas.includes(chromaContentId));
  const isInWishlist = isSkinInWishlist && isChromaInWishlist;

  return (
    <div
      role="list-item"
      className="min-h-10 flex items-center justify-between px-2.5 py-1 not-last:border-b"
      key={wishlist._id}
    >
      <NavLink to={`/wishlists/${wishlist._id}`} className="text-sm font-medium">
        {wishlist.name === "__MAIN__" ? t("wishlist.__MAIN__") : wishlist.name}
      </NavLink>
      {isWishlistUpdating && (
        <div className="p-2">
          <Spinner />
        </div>
      )}

      {!isWishlistUpdating && isInWishlist && (
        <Button size="icon-sm" variant="ghost" onClick={removeFromExistingWishlist} className="text-destructive">
          <CircleMinusIcon />
        </Button>
      )}

      {!isWishlistUpdating && !isInWishlist && (
        <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
          <CirclePlusIcon />
        </Button>
      )}
    </div>
  );
};

const AddToWishlist: FC<AddToWishlistProps> = ({
  trigger,
  skinName,
  skinContentIds = [],
  chromaName,
  chromaContentIds = [],
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);
  const addSkinsWaiting = useSelector(appAddSkinsWaitingSelector);
  const addChromasWaiting = useSelector(appAddChromasWaitingSelector);

  const [open, setOpen] = useState(false);

  const { data: wishlists = [] } = useGetWishlistsQuery(undefined, {
    skip: !isAuth,
  });

  const allSkins = wishlists.flatMap((w) => w.skins);
  const allChromas = wishlists.flatMap((w) => w.chromas);
  const isSkinInWishlist = skinContentIds.every((id) => allSkins.includes(id));
  const isChromaInWishlist = chromaContentIds.every((id) => allChromas.includes(id));

  const openHandler = () => {
    if (!skinContentIds.length && !chromaContentIds.length) return;

    if (isAuth) setOpen(true);
    else {
      if (skinContentIds.length) dispatch(setAddSkinsWaiting(skinContentIds));
      if (chromaContentIds.length) dispatch(setAddChromasWaiting(chromaContentIds));

      navigate("/auth/signin?redirect=" + pathname);
    }
  };

  useEffect(() => {
    const skinsMatch = addSkinsWaiting.length > 0 && isEqual(addSkinsWaiting, skinContentIds);
    const chromasMatch = addChromasWaiting.length > 0 && isEqual(addChromasWaiting, chromaContentIds);

    if ((skinsMatch || chromasMatch) && !open && isAuth) {
      dispatch(setAddSkinsWaiting([]));
      dispatch(setAddChromasWaiting([]));
      setOpen(true);
    }
  }, [isAuth, addSkinsWaiting, addChromasWaiting]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger({ openState: open, onOpen: openHandler, isSkinInWishlist, isChromaInWishlist })}
      </DialogTrigger>
      <DialogContent preventDefault showCloseButton className="gap-y-2">
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>{t("skin.add")}</DialogTitle>
          <DialogDescription>
            {!!skinContentIds.length &&
              (skinContentIds.length === 1 && skinName ? (
                <>
                  {t("skin.addHelper")} <span className="font-medium">{skinName}</span>
                </>
              ) : (
                <>
                  {t("skin.addHelperMany")} ({skinContentIds.length})
                </>
              ))}
            {!!chromaContentIds.length &&
              (chromaContentIds.length === 1 && chromaName ? (
                <>
                  {t("chroma.addHelper")} <span className="font-medium">{chromaName}</span>
                </>
              ) : (
                <>
                  {t("chroma.addHelperMany")} ({chromaContentIds.length})
                </>
              ))}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div role="list" className={cn({ "border-b": wishlists.length < 3 })}>
            {wishlists?.map((wishlist) => (
              <AddToWishlistLine
                key={wishlist._id}
                wishlist={wishlist}
                skinContentIds={skinContentIds}
                chromaContentIds={chromaContentIds}
              />
            ))}
          </div>

          {wishlists.length < 3 && (
            <WishlistCreateModal skinContentIds={skinContentIds} chromaContentIds={chromaContentIds}>
              <Button variant="ghost" size="sm" className="justify-start">
                <PlusIcon />
                {t("wishlist.createAndAdd")}
              </Button>
            </WishlistCreateModal>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlist;
