import AppHeaderLink from "@/components/AppHeaderLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { cn } from "@/shared/utils/cn";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { UserSettings } from "../UserSettings";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { appAuthSelector } from "@/store";

interface IProps {
  className?: string;
  closeSidebar?: () => void;
}

const HeaderNav: FC<IProps> = ({ className, closeSidebar }) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const isAuth = useSelector(appAuthSelector);

  const authLink = (type: "signin" | "signup") => {
    return `/auth/${type}${pathname === "/" ? "" : "?redirect=" + pathname}`;
  };

  return (
    <nav className={cn("flex items-center gap-2 lg:gap-4", className)}>
      <div className="flex flex-col md:flex-row items-center gap-5 shrink-0">
        <AppHeaderLink to="/about" text={t("header.about")} handleClick={closeSidebar} className="w-full md:w-fit" />
        {isAuth && (
          <>
            <AppHeaderLink
              to="/wishlists"
              text={t("header.wishlists")}
              handleClick={closeSidebar}
              className="w-full md:w-fit"
            />
            <AppHeaderLink
              to="/collection/skins"
              text={t("header.collection")}
              handleClick={closeSidebar}
              className="w-full md:w-fit"
            />
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-full gap-3 px-4">
        <div className="flex gap-3 items-center justify-center">
          <LanguageSwitcher />
          <ThemeSwitcher />
          {isAuth && <UserSettings />}
        </div>

        {!isAuth && (
          <div className="flex items-center gap-x-2 mx-auto">
            <AppHeaderLink to={authLink("signup")} text={t("header.signup")} />
            <Separator orientation="vertical" className="h-4!" />
            <AppHeaderLink to={authLink("signin")} text={t("header.signin")} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderNav;
