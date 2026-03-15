import { useState, type FC } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useUpdateWishlistMutation } from "@/api";
import { useParams } from "react-router";
import type { WishlistDto } from "@/types/wishlist";

interface EditWishlistProps {
  wishlistInfo: WishlistDto;
}

const EditWishlistModal: FC<EditWishlistProps> = ({ wishlistInfo }) => {
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();
  const { wishlistId } = useParams();

  const [newName, setNewName] = useState("");

  const renameWishlistHandler = async () => {
    await updateWishlist({ wishlistId: wishlistId ?? "", body: { name: newName } });
  };
  const deleteWishlistHandler = async () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
          Edit Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={true} className="gap-y-2">
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>Edit Wishlist</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Input value={newName} onChange={(e) => setNewName(e?.target?.value)} />
          {wishlistInfo?.name !== newName && (
            <Button disabled={isWishlistUpdating} onClick={renameWishlistHandler}>
              Save
            </Button>
          )}
          <Button disabled={isWishlistUpdating} variant="destructive" onClick={deleteWishlistHandler}>
            Delete Wishlist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWishlistModal;
