import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type FC } from "react";
import { Typography } from "./Typography";
import { Input } from "./ui/input";
import { useCreateWishlistMutation } from "@/api";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { cn } from "@/shared/utils/cn";

interface IProps {
  buttonClassName?: string;
}

const CreateWishlistModal: FC<IProps> = ({ buttonClassName }) => {
  const { t } = useTranslation();

  const [wishlistName, setWishlistName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [createWishlist, { isLoading: isWishlistCreating, isError, error }] = useCreateWishlistMutation();

  const createWishlistHandler = async () => {
    try {
      await createWishlist({ name: wishlistName });
    } catch (error) {
      console.log(error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button className={cn("", buttonClassName)}>{t("wishlist.create-new-wishlist")}</Button>
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
          <Button disabled={isWishlistCreating || !wishlistName} className="mt-4" onClick={createWishlistHandler}>
            {t("wishlist.create-wishlist")}

            {isWishlistCreating && <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWishlistModal;
