import { useState, type ChangeEvent, type FC, type PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

import { useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { WishlistFullDto } from "@/types/wishlist";

interface EditWishlistProps extends PropsWithChildren {
  wishlist: WishlistFullDto;
}

const WishlistEditModal: FC<EditWishlistProps> = ({ wishlist, children }) => {
  const { t } = useTranslation();
  const { wishlistId } = useParams();

  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();

  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(wishlist?.name);

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const closeHandler = () => {
    setOpen(false);
    setNewName(wishlist.name);
  };

  const openChangeHandler = (value: boolean) => {
    if (value) setOpen(value);
    else closeHandler();
  };

  const renameWishlistHandler = async () => {
    try {
      await updateWishlist({ wishlistId: wishlistId ?? "", body: { name: newName } });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>{children ?? <Button>{t("wishlist.edit")}</Button>}</DialogTrigger>
      <DialogContent showCloseButton className="gap-y-5">
        <DialogTitle>{t("wishlist.edit_title")}</DialogTitle>
        <form className="flex flex-col gap-y-2">
          <Input value={newName} onChange={changeNameHandler} placeholder={t("wishlist.edit_placeholder")} />

          <div className="flex flex-col gap-y-1">
            <Button
              onClick={renameWishlistHandler}
              disabled={isWishlistUpdating || wishlist.name.trim() === newName.trim() || !newName.trim().length}
              type="submit"
            >
              {t("shared.save")}
            </Button>
            <Button type="button" variant="outline" onClick={closeHandler}>
              {t("shared.cancel")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistEditModal;
