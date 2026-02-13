import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
// import { Spinner } from '@/components/ui/spinner';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PlusIcon } from "lucide-react";
import { useState, type FC, type MouseEvent, type ReactNode } from "react";

interface AddToWishlistProps {
  trigger: (options: { openState: boolean; onOpen: (event: MouseEvent<HTMLElement>) => void }) => ReactNode;
}

const AddToWishlist: FC<AddToWishlistProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);

  const openHandler = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('[DEV]', 'hello&');
    setOpen(true);
  }

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
          <ToggleGroup
            type="single"
            orientation="vertical"
            spacing={1}
            className="flex-col items-start w-full"
            onClick={addToExistingWishlist}
          >
            <ToggleGroupItem
              className="
                w-full flex items-center justify-start
                transition-colors hover:text-foreground
                hover:bg-neutral-300/50 data-state-on:bg-neutral-300
                dark:hover:bg-neutral-700/50 dark:data-state-on:bg-neutral-700
                whitespace-normal text-left py-1 h-fit min-h-8
              "
              value={"Shared"}
            >
              {/* <Spinner /> */}
              Shared
            </ToggleGroupItem>
          </ToggleGroup>
          <Separator />
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
