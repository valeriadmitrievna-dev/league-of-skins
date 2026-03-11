import { type FC } from "react";
import { NavLink } from "react-router";
import AppLogo from "@/components/AppLogo";

import Sidebar from "./Sidebar";
import HeaderNav from "./HeaderNav";

const AppHeader: FC = () => {
  return (
    <>
      <div className="flex items-center justify-between py-1.5 pt-3 my-container">
        <NavLink to="/">
          <AppLogo />
        </NavLink>

        <HeaderNav className="hidden md:flex" />

        <div className="md:hidden">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default AppHeader;
