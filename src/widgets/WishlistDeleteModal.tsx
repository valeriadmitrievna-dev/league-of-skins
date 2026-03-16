import { useState, type FC, type MouseEvent, type ReactNode } from "react";

import { useDeleteWishlistMutation } from "@/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";

interface WishlistDeleteModalProps {
  wishlistId: string;
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const WishlistDeleteModal: FC<WishlistDeleteModalProps> = ({ wishlistId, trigger, onSubmit, onCancel }) => {
  const [open, setOpen] = useState(false);

  const [deleteWishlist, { isLoading }] = useDeleteWishlistMutation();

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLoading) return;

    setOpen(true);
  };

  const deleteWishlistHandler = async () => {
    await deleteWishlist(wishlistId);
    onSubmit?.();
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your wishlist.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <Button variant="destructive" disabled={isLoading} onClick={deleteWishlistHandler}>
            {isLoading && <Spinner />}
            Delete wishlist
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WishlistDeleteModal;
