import { PlusIcon } from "lucide-react";
import { useState, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWishlist } from "@/hooks/useCreateWishlist";
import { cn } from "@/shared/utils/cn";

interface CreateWishlistModalProps {
  buttonClassName?: string;
  skinContentId?: string;
  children?: ReactNode;
}

const CreateWishlistModal: FC<CreateWishlistModalProps> = ({ buttonClassName, skinContentId, children }) => {
  const { t } = useTranslation();

  const [wishlistName, setWishlistName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { createWishlistHandler: createWishlist, isLoading: isWishlistCreating } = useCreateWishlist();

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
        {children ?? (
          <Button className={cn("", buttonClassName)}>
            <PlusIcon />
            {t("wishlist.create")}
          </Button>
        )}
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
