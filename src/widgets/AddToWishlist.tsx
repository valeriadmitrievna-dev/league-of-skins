import { useGetWishlistsQuery, useUpdateWishlistMutation } from "@/api";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  // appAddChromaWaitingSelector,
  appAddSkinWaitingSelector,
  appAuthSelector,
  setAddChromaWaiting,
  setAddSkinWaiting,
} from "@/store";
import type { ChromaDto } from "@/types/chroma";
import type { SkinDto } from "@/types/skin";
import { CirclePlusIcon, Loader2, PlusIcon } from "lucide-react";
import { useEffect, useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
  skinName: string;
  skinContentId: SkinDto["id"];
  chromaName?: string;
  chromaId?: ChromaDto["id"];
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger, skinName, skinContentId, chromaId }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);
  const addSkinWaiting = useSelector(appAddSkinWaitingSelector);
  // const addChromaWaiting = useSelector(appAddChromaWaitingSelector);

  const [open, setOpen] = useState(false);

  const { data: wishlists = [] } = useGetWishlistsQuery();

  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!skinContentId && !chromaId) return;

    if (isAuth) setOpen(true);
    else {
      if (skinContentId) dispatch(setAddSkinWaiting(skinContentId));
      if (chromaId) dispatch(setAddChromaWaiting(chromaId));

      navigate("/auth/signin?redirect=" + pathname);
    }
  };

  const addToExistingWishlist = async (wishlistId: string) => {
    try {
      await updateWishlist({ wishlistId, body: { addIds: [skinContentId] } });
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  const createNewWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  useEffect(() => {
    if (addSkinWaiting && !open && addSkinWaiting === skinContentId && isAuth) {
      dispatch(setAddSkinWaiting(null));

      setOpen(true);
    }
  }, [isAuth, addSkinWaiting]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</DialogTrigger>
      <DialogContent showCloseButton={true} className="gap-y-2">
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>{t("skin.add")}</DialogTitle>
          <DialogDescription>
            {t("skin.addHelper")} {skinName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div role="list">
            {wishlists?.map((wishlist) => {
              const isSkinInWishlist = wishlist.skins.includes(skinContentId);

              return (
                <div
                  role="list-item"
                  className="min-h-8  rounded-md flex items-center justify-between px-2.5 py-1 border-b"
                  key={wishlist._id}
                >
                  <span className="text-sm font-medium">
                    {wishlist.name === "__MAIN__" ? t("wishlist.__MAIN__") : wishlist.name}
                  </span>
                  {isWishlistUpdating && (
                    <div className="p-2">
                      <Loader2 className="animate-spin" size={16} />
                    </div>
                  )}

                  {!isWishlistUpdating && isSkinInWishlist && <Typography.Muted>Already added</Typography.Muted>}

                  {!isWishlistUpdating && !isSkinInWishlist && (
                    <Button size="icon-sm" variant="ghost" onClick={() => addToExistingWishlist(wishlist._id)}>
                      <CirclePlusIcon />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>

          <Button variant="ghost" size="sm" className="justify-start" onClick={createNewWishlist} disabled>
            <PlusIcon />
            {t("wishlist.createAndAdd")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlist;
