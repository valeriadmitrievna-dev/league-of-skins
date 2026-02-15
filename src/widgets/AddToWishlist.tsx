import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { appAuthSelector } from "@/store";
import { CirclePlusIcon, PlusIcon } from "lucide-react";
import { useState, type FC, type MouseEvent, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger }) => {
  const navigate = useNavigate();
  const isAuth = useSelector(appAuthSelector);
  const [open, setOpen] = useState(false);

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isAuth) setOpen(true);
    else navigate("/signin");
  };

  const addToExistingWishlist = async () => {
    setOpen(false);
  };

  const createNewWishlist = async () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger({ openState: open, onOpen: openHandler })}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <div className="flex flex-col gap-y-2">
          <span className="text-foreground/50 px-2.5">Wishlists</span>
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
            Create new wishlist and add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToWishlist;
