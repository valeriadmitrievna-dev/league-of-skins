import type { FC } from "react";
import { Outlet, ScrollRestoration } from "react-router";

import { AppHeader } from "@/widgets/AppHeader";

const LayoutPage: FC = () => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">
      <AppHeader />
      <Outlet />
      <ScrollRestoration />
    </div>
  );
};

export default LayoutPage;
