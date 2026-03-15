import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/Typography";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWishlist } from "@/hooks/useCreateWishlist";

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
