import { type FC } from "react";
import { NavLink } from "react-router";
import AppLogo from "@/components/AppLogo";
import AppHeaderNav from './AppHeaderNav';
import AppSidebar from './AppSidebar';

const AppHeader: FC = () => {
  return (
    <>
      <div className="flex items-center justify-between py-1.5 pt-3 my-container">
        <NavLink to="/">
          <AppLogo />
        </NavLink>

        <AppHeaderNav className="hidden md:flex" />

        <div className="md:hidden">
          <AppSidebar />
        </div>
      </div>
    </>
  );
};

export default AppHeader;
