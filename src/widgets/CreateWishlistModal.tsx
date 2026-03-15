import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/utils/cn";
<<<<<<< HEAD:src/widgets/CreateWishlistModal.tsx
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/Typography";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWishlist } from "@/hooks/useCreateWishlist";
=======
import { Spinner } from "./ui/spinner";
import { PlusIcon } from 'lucide-react';
>>>>>>> 64c8c765bc3640c853e706635224a370bc4596db:src/components/CreateWishlistModal.tsx

interface CreateWishlistModalProps {
  buttonClassName?: string;
  skinContentId?: string;
  children?: ReactNode;
}

const CreateWishlistModal: FC<CreateWishlistModalProps> = ({ buttonClassName, skinContentId, children }) => {
  const { t } = useTranslation();

  const [wishlistName, setWishlistName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { createWishlistHandler: createWishlist, isLoading: isWishlistCreating, isError, error } = useCreateWishlist();

  const createWishlistHandler = async () => {
    try {
      await createWishlist(wishlistName?.trim(), skinContentId);
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {children ?? <Button className={cn("", buttonClassName)}>{t("wishlist.create-new-wishlist")}</Button>}
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm! overflow-hidden">
        <div className="flex flex-col justify-center">
          <Typography.P>New Wishlist</Typography.P>
          <Input
            value={wishlistName}
            onChange={(e) => setWishlistName(e?.target?.value)}
            className="mt-3"
            placeholder={t("wishlist.enter-wishlist-name")}
          />
          {isError && <Typography.P className="mt-2 text-red-500">{(error as any)?.data?.message}</Typography.P>}
          <Button disabled={isWishlistCreating || !wishlistName?.trim()} className="mt-4" onClick={createWishlistHandler}>
            {isWishlistCreating && <Spinner />}

            {t("wishlist.create-wishlist")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWishlistModal;
