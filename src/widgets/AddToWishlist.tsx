import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { appAuthSelector } from "@/store";
import { CirclePlusIcon, PlusIcon } from "lucide-react";
import { useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuth = useSelector(appAuthSelector);
  const [open, setOpen] = useState(false);

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isAuth) setOpen(true);
    else navigate("/auth/signin");
  };

  const addToExistingWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  const createNewWishlist = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger({ openState: open, onOpen: openHandler })}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <div className="flex flex-col gap-y-2">
          <span className="text-foreground/50 px-2.5">{t('app.wishlists')}</span>
          <div role="list">
            <div role="list-item" className="min-h-8  rounded-md flex items-center justify-between px-2.5 py-1 border-b">
              <span className="text-sm font-medium">Shared</span>
              <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
                <CirclePlusIcon />
              </Button>
            </div>
            <div role="list-item" className="min-h-8  rounded-md flex items-center justify-between px-2.5 py-1 border-b">
              <span className="text-sm font-medium">Pink</span>
              <Button size="icon-sm" variant="ghost" onClick={addToExistingWishlist}>
                <CirclePlusIcon />
              </Button>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="justify-start" onClick={createNewWishlist}>
            <PlusIcon />
            {t("wishlist.createAndAdd")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlist;
