import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import AppHeaderLink from "@/components/AppHeaderLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/shared/utils/cn";
import { appAuthSelector } from "@/store";

import { UserSettings } from "../UserSettings";


interface AppHeaderNavProps {
  className?: string;
  onCloseSidebar?: () => void;
}

const AppHeaderNav: FC<AppHeaderNavProps> = ({ className, onCloseSidebar }) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);

  const authLink = (type: "signin" | "signup") => {
    return `/auth/${type}${pathname === "/" ? "" : "?redirect=" + pathname}`;
  };

  return (
    <nav className={cn("flex items-center gap-2 lg:gap-4", className)}>
      <div className="flex flex-col md:flex-row items-center gap-8 shrink-0">
        <AppHeaderLink to="/about" text={t("header.about")} onClick={onCloseSidebar} className="w-full md:w-fit" />
        {isAuth && (
          <>
            <AppHeaderLink
              to="/wishlists"
              text={t("header.wishlists")}
              onClick={onCloseSidebar}
              className="w-full md:w-fit"
            />
            <AppHeaderLink
              to="/collection/skins"
              text={t("header.collection")}
              onClick={onCloseSidebar}
              className="w-full md:w-fit"
            />
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-full gap-3">
        <div className="flex gap-3 items-center justify-center md:ml-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          {isAuth && <UserSettings />}
        </div>

        {!isAuth && (
          <div className="flex items-center gap-x-3 mx-auto md:ml-3">
            <AppHeaderLink to={authLink("signup")} text={t("header.signup")} />
            <Separator orientation="vertical" className="h-4!" />
            <AppHeaderLink to={authLink("signin")} text={t("header.signin")} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppHeaderNav;
