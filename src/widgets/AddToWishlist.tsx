import { useGetSkinQuery } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  // appAddChromaWaitingSelector,
  appAddSkinWaitingSelector,
  appAuthSelector,
  setAddChromaWaiting,
  setAddSkinWaiting,
} from "@/store";
import type { ChromaDto } from '@/types/chroma';
import type { SkinDto } from '@/types/skin';
import { CirclePlusIcon, PlusIcon } from "lucide-react";
import { useEffect, useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
  skinContentId?: SkinDto["id"];
  chromaId?: ChromaDto["id"];
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger, skinContentId, chromaId }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(appAuthSelector);
  const addSkinWaiting = useSelector(appAddSkinWaitingSelector);
  // const addChromaWaiting = useSelector(appAddChromaWaitingSelector);

  const [open, setOpen] = useState(false);

  const { data: skinData } = useGetSkinQuery(
    { contentId: skinContentId!, lang: i18n.language },
    { skip: !skinContentId || !open },
  );

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!skinContentId && !chromaId) return;

    if (isAuth) setOpen(true);
    else {
      if (skinContentId) dispatch(setAddSkinWaiting(skinContentId));
      if (chromaId) dispatch(setAddChromaWaiting(chromaId));
      navigate("/auth/signin");
    }
  };

  const addToExistingWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  const createNewWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  useEffect(() => {
    if (addSkinWaiting && !open && addSkinWaiting === skinContentId && isAuth) {
      dispatch(setAddSkinWaiting(null));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [isAuth, addSkinWaiting]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</DialogTrigger>
      <DialogContent showCloseButton={true}>
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>{t('skin.add')}</DialogTitle>
          <DialogDescription>{t('skin.addHelper')} {skinData?.name}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <div role="list">
            <div role="list-item" className="min-h-8  rounded-md flex items-center justify-between px-2.5 py-1 border-b">
              <span className="text-sm font-medium">Shared</span>
              <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
                <CirclePlusIcon />
              </Button>
            </div>
            <div role="list-item" className="min-h-8  rounded-md flex items-center justify-between px-2.5 py-1 border-b">
              <span className="text-sm font-medium">Pink</span>
              <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
                <CirclePlusIcon />
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="justify-start" onClick={createNewWishlist}>
            <PlusIcon />
            {t("wishlist.createAndAdd")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlist;
