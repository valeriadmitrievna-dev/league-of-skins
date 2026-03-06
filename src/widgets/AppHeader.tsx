import { type FC } from "react";
import { NavLink, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import AppLogo from "@/components/AppLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useSelector } from "react-redux";
import { appAuthSelector } from "@/store";
import { Separator } from "@/components/ui/separator";
import { UserSettings } from "./UserSettings";
import AppHeaderLink from "@/components/AppHeaderLink";

const AppHeader: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);

  const authLink = (type: "signin" | "signup") => {
    return `/auth/${type}${pathname === "/" ? "" : "?redirect=" + pathname}`;
  };

  return (
    <div className="flex items-center justify-between py-1.5 pt-3 my-container">
      <NavLink to="/">
        <AppLogo />
      </NavLink>
      <nav className="flex items-center gap-3">
        <AppHeaderLink to="/about" text={t("header.about")} />
        {isAuth && (
          <>
            <AppHeaderLink to="/wishlists" text={t("header.wishlists")} disabled />
            <AppHeaderLink to="/collection/skins" text={t("header.collection")} />
          </>
        )}
        <LanguageSwitcher />
        <ThemeSwitcher />

        {!isAuth && (
          <div className="flex items-center gap-x-2 ml-2">
            <AppHeaderLink to={authLink("signup")} text={t("header.signup")} variant="secondary" />
            <Separator orientation="vertical" className="h-4!" />
            <AppHeaderLink to={authLink("signin")} text={t("header.signin")} variant="secondary" />
          </div>
        )}

        {isAuth && <UserSettings />}
      </nav>
    </div>
  );
};

export default AppHeader;
