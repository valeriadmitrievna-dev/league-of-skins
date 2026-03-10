import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TextAlignJustify } from "lucide-react";
import type { FC } from "react";
import HeaderNav from "./HeaderNav";

const Sidebar: FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <TextAlignJustify size={16} />
      </SheetTrigger>
      <SheetContent>
        <HeaderNav className="flex-col" />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
