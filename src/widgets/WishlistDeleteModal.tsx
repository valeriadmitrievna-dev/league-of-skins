import { useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface WishlistDeleteModalProps {
  wishlistId: string;
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
  onCancel?: () => void;
  onSubmit?: () => void;
}

const WishlistDeleteModal: FC<WishlistDeleteModalProps> = ({ wishlistId, trigger, onSubmit, onCancel }) => {
  const { t } = useTranslation();
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
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("shared.delete_title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("shared.delete_text")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{t('shared.cancel')}</AlertDialogCancel>
          <Button variant="destructive" disabled={isLoading} onClick={deleteWishlistHandler}>
            {isLoading && <Spinner />}
            {t('shared.delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WishlistDeleteModal;
