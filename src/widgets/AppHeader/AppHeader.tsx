import { type FC } from "react";
import { NavLink } from "react-router";

import AppLogo from "@/components/AppLogo";

import AppHeaderNav from "./AppHeaderNav";
import AppSidebar from "./AppSidebar";

const AppHeader: FC = () => {
  return (
    <header className="relative border-b bg-card">
      <div className="h-16 md:h-20 flex items-center justify-between my-container">
        <NavLink to="/">
          <AppLogo />
        </NavLink>

        <AppHeaderNav className="hidden md:flex" />

        <div className="md:hidden h-5">
          <AppSidebar />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
