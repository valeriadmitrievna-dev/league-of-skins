import { TextAlignJustifyIcon } from "lucide-react";
import { useState, type FC } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import HeaderNav from "./AppHeaderNav";

const AppSidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <TextAlignJustifyIcon className="size-5" />
      </SheetTrigger>
      <SheetContent className="pt-12 pb-4">
        <HeaderNav onCloseSidebar={handleCloseSidebar} className="justify-between h-full flex-col md:flex-row" />
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
