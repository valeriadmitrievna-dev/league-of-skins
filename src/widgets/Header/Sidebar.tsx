import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TextAlignJustify } from "lucide-react";
import { useState, type FC } from "react";
import HeaderNav from "./HeaderNav";

const Sidebar: FC = () => {
const [isOpen, setIsOpen] = useState(false)
const handleCloseSidebar = () => {
  setIsOpen(false)
}

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <TextAlignJustify size={16} />
      </SheetTrigger>
      <SheetContent className='pt-12 pb-4'>
        <HeaderNav closeSidebar={handleCloseSidebar} className="justify-between h-full flex-col md:flex-row" />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
