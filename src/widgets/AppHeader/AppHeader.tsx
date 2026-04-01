import { type FC } from "react";
import { NavLink } from "react-router";

import AppLogo from "@/components/AppLogo";

import AppHeaderNav from "./AppHeaderNav";
import AppSidebar from "./AppSidebar";

const AppHeader: FC = () => {
  return (
    <header className="relative border-b bg-card h-16 md:h-18 flex items-center justify-between px-5">
      <NavLink to="/">
        <AppLogo />
      </NavLink>

      <AppHeaderNav className="hidden md:flex" />

      <div className="md:hidden h-5">
        <AppSidebar />
      </div>
    </header>
  );
};

export default AppHeader;
