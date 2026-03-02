import { type FC } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import AppLogo from "@/components/AppLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { appAuthSelector } from "@/store";
import { Separator } from "@/components/ui/separator";
import UserSettings from "./UserSettings";

const AppHeader: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);

  const authLink = (type: 'signin' | 'signup') => {
    return `/auth/${type}${pathname === '/' ? '' : '?redirect=' + pathname}`;
  }

  return (
    <div className="flex items-center justify-between py-1.5 pt-3 my-container">
      <NavLink to="/">
        <AppLogo />
      </NavLink>
      <nav className="flex items-center gap-3">
        <Button className="text-base" variant="ghost" asChild>
          <NavLink to="/about">{t("header.about")}</NavLink>
        </Button>
        {isAuth && (
          <>
            <Button className="text-base" variant="ghost" asChild>
              <NavLink to="/wishlists">{t("header.wishlists")}</NavLink>
            </Button>
            <Button className="text-base" variant="ghost" asChild>
              <NavLink to="/skins">{t("header.skins")}</NavLink>
            </Button>
          </>
        )}
        <LanguageSwitcher />
        <ThemeSwitcher />

        {!isAuth && (
          <div className="flex items-center gap-x-2 ml-2">
            <Button className="text-base" variant="secondary" asChild>
              <NavLink to={authLink('signup')}>{t("header.signup")}</NavLink>
            </Button>
            <Separator orientation="vertical" className="h-4!" />
            <Button className="text-base" variant="secondary" asChild>
              <NavLink to={authLink('signin')}>{t("header.signin")}</NavLink>
            </Button>
          </div>
        )}

        {isAuth && <UserSettings />}
      </nav>
    </div>
  );
};

export default AppHeader;
