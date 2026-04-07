import { PlusIcon } from "lucide-react";
import { useState, type ChangeEvent, type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useCreateWishlist } from "@/hooks/useCreateWishlist";
import { cn } from "@/shared/utils/cn";

interface WishlistCreateModalProps {
  buttonClassName?: string;
  skinContentIds?: string[];
  chromaContentIds?: string[];
  children?: ReactNode;
}

const WishlistCreateModal: FC<WishlistCreateModalProps> = ({
  buttonClassName,
  skinContentIds = [],
  chromaContentIds = [],
  children,
}) => {
  const { t } = useTranslation();

  const [wishlistName, setWishlistName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const { createWishlistHandler: createWishlist, isLoading: isWishlistCreating } = useCreateWishlist();

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setWishlistName(event.target.value.slice(0, 100));
  };

  const createWishlistHandler = async () => {
    try {
      await createWishlist(wishlistName?.trim(), skinContentIds, chromaContentIds);
    } catch (error) {
      console.error(error);
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
        <form className="flex flex-col justify-center">
          <Typography.P>{t("wishlist.create_title")}</Typography.P>
          <InputGroup className="mt-3">
            <InputGroupInput
              value={wishlistName}
              onChange={changeNameHandler}
              placeholder={t("wishlist.create_placeholder")}
            />
            <InputGroupAddon align="inline-end">{wishlistName.trim().length}/100</InputGroupAddon>
          </InputGroup>
          <Button
            type="submit"
            disabled={isWishlistCreating || !wishlistName?.trim()}
            className="mt-4"
            onClick={createWishlistHandler}
          >
            {isWishlistCreating && <Spinner />}

            {t("shared.save")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistCreateModal;
