import { type FC } from "react";
import { NavLink } from "react-router";

import AppLogo from "@/components/AppLogo";

import AppHeaderNav from './AppHeaderNav';

const AppHeader: FC = () => {
  return (
    <>
      <div className="flex items-center justify-between py-1.5 pt-3 my-container">
        <NavLink to="/">
          <AppLogo />
        </NavLink>

        <AppHeaderNav className="hidden md:flex" />
      </div>
    </>
  );
};

export default AppHeader;
