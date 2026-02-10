import { type FC } from "react";
import s from "./AppHeader.module.scss";
import AppLogo from "@/components/AppLogo/AppLogo";
import { NavLink } from "react-router";
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const AppHeader: FC = () => {
  return (
    <div className={s.appHeader}>
      <NavLink to='/'>
        <AppLogo />
      </NavLink>
      <nav className={s.appHeaderNavigation}>
        <NavLink to='/support'>Support project</NavLink>
        <NavLink to='/wishlists'>Wishlists</NavLink>
        <ThemeSwitcher />
      </nav>
    </div>
  );
};

export default AppHeader;
