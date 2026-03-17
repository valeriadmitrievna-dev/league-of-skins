import type { FC } from "react";

import { Button } from '@/components/ui/button';

const AppMenu: FC = () => {
  return <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-5">
    <Button variant="ghost" size="icon">

    </Button>
  </div>;
};

export default AppMenu;
