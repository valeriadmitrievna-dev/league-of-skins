import { Pencil } from "lucide-react";
import { useState, type FC, type PropsWithChildren } from "react";
import { useNavigate, useParams } from "react-router";

import { useDeleteWishlistMutation, useUpdateWishlistMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { WishlistFullDto } from "@/types/wishlist";

interface EditWishlistProps extends PropsWithChildren {
  wishlist: WishlistFullDto;
}

const EditWishlistModal: FC<EditWishlistProps> = ({ wishlist, children }) => {
  const [updateWishlist, { isLoading: isWishlistUpdating }] = useUpdateWishlistMutation();
  const [deleteWishlist, { isLoading: isWishlistDeleting }] = useDeleteWishlistMutation();
  const { wishlistId } = useParams();
  const navigate = useNavigate();

  const [newName, setNewName] = useState(wishlist?.name);

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
        {children ?? (
          <Button>
            <Pencil />
            Edit Wishlist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent showCloseButton className="gap-y-2">
        <DialogHeader className="px-2.5 pt-2">
          <DialogTitle>Edit Wishlist</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <Input value={newName} onChange={(e) => setNewName(e?.target?.value)} />
          {wishlist?.name !== newName && (
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
