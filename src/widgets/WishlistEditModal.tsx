import { useState, type ChangeEvent, type FC, type PropsWithChildren } from "react";
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>{children ?? <Button>Edit Wishlist</Button>}</DialogTrigger>
      <DialogContent showCloseButton className="gap-y-5">
        <DialogTitle>Edit Wishlist</DialogTitle>
        <div className="flex flex-col gap-y-2">
          <Input value={newName} onChange={changeNameHandler} />

          <div className="flex flex-col gap-y-1">
            <Button
              onClick={renameWishlistHandler}
              disabled={isWishlistUpdating || wishlist.name.trim() === newName.trim() || !newName.trim().length}
            >
              Save
            </Button>
            <Button variant="outline" onClick={closeHandler}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistEditModal;
