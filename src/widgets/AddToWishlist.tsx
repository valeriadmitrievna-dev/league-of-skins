import { isEqual } from "lodash";
import { CircleMinusIcon, CirclePlusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router";

import { useGetWishlistsQuery, useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from '@/shared/utils/cn';
import { appAddSkinsWaitingSelector, appAuthSelector, setAddSkinsWaiting } from "@/store";
import type { ChromaDto } from "@/types/chroma";
import type { SkinDto } from "@/types/skin";
import type { WishlistDto } from "@/types/wishlist";

import WishlistCreateModal from "./Wishlist/WishlistCreateModal";

interface AddToWishlistLineProps {
  wishlist: WishlistDto;
  skinContentIds: string[];
}

const AddToWishlistLine: FC<AddToWishlistLineProps> = ({ wishlist, skinContentIds }) => {
  const { t } = useTranslation();

  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const addToExistingWishlist = async () => {
    await updateWishlist({ wishlistId: wishlist._id, body: { addIds: skinContentIds } });
  };

  const removeFromExistingWishlist = async () => {
    await updateWishlist({ wishlistId: wishlist._id, body: { removeIds: skinContentIds } });
  };

  const isSkinInWishlist = skinContentIds.every((skinContentId) => wishlist.skins.includes(skinContentId));

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

      {!isWishlistUpdating && isSkinInWishlist && (
        <Button size="icon-sm" variant="ghost" onClick={removeFromExistingWishlist}>
          <CircleMinusIcon />
        </Button>
      )}

      {!isWishlistUpdating && !isSkinInWishlist && (
        <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
          <CirclePlusIcon />
        </Button>
      )}
    </div>
  );
};

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: () => void }) => ReactNode;
  skinName?: string;
  skinContentIds: SkinDto["id"][];
  chromaName?: string;
  chromaId?: ChromaDto["id"];
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger, skinName, skinContentIds, chromaId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);
  const addSkinsWaiting = useSelector(appAddSkinsWaitingSelector);

  const [open, setOpen] = useState(false);

  const { data: wishlists = [] } = useGetWishlistsQuery(undefined, {
    skip: !isAuth,
  });

  const openHandler = () => {
    if (!skinContentIds.length && !chromaId) return;

    if (isAuth) setOpen(true);
    else {
      if (skinContentIds.length) dispatch(setAddSkinsWaiting(skinContentIds));

      navigate("/auth/signin?redirect=" + pathname);
    }
  };

  useEffect(() => {
    if (addSkinsWaiting.length && !open && isEqual(addSkinsWaiting, skinContentIds) && isAuth) {
      dispatch(setAddSkinsWaiting([]));

      setOpen(true);
    }
  }, [isAuth, addSkinsWaiting]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</DialogTrigger>
      <DialogContent preventDefault showCloseButton className="gap-y-2">
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>{t("skin.add")}</DialogTitle>
          <DialogDescription>
            {skinContentIds.length === 1 && skinName ? (
              <>
                {t("skin.addHelper")} {skinName}
              </>
            ) : (
              <>
                {t("skin.addHelperMany")} ({skinContentIds.length})
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div role="list" className={cn({ 'border-b': wishlists.length < 3 })}>
            {wishlists?.map((wishlist) => (
              <AddToWishlistLine wishlist={wishlist} skinContentIds={skinContentIds} />
            ))}
          </div>

          {wishlists.length < 3 && (
            <WishlistCreateModal skinContentIds={skinContentIds}>
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
