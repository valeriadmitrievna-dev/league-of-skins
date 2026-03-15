import { Pencil } from "lucide-react";
import { useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";

import { useDeleteWishlistMutation, useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { WishlistFullDto } from "@/types/wishlist";

interface EditWishlistProps {
  wishlistInfo: WishlistFullDto;
}

const EditWishlistModal: FC<EditWishlistProps> = ({ wishlistInfo }) => {
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();
  const [deleteWishlist, { isLoading: isWishlistDeleting }] = useDeleteWishlistMutation();
  const { wishlistId } = useParams();
  const navigate = useNavigate();

  const [newName, setNewName] = useState(wishlistInfo?.name);

  const renameWishlistHandler = async () => {
    try {
      await updateWishlist({ wishlistId: wishlistId ?? "", body: { name: newName } });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteWishlistHandler = async () => {
    try {
      await deleteWishlist({ wishlistId: wishlistId ?? "" });
      navigate("/wishlists");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Pencil />
          Edit Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton className="gap-y-2">
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
          <Button disabled={isWishlistDeleting} variant="destructive" onClick={deleteWishlistHandler}>
            Delete Wishlist
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWishlistModal;
