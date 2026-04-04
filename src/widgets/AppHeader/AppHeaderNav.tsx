import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/shared/utils/cn";
import { appAuthSelector } from "@/store/app/app.selectors";

import { UserSettings } from "../UserSettings";
// import AppHeaderItem from "./AppHeaderItem";
import AppHeaderLink from "./AppHeaderLink";

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
        <AppHeaderLink to="/search/skins" text={t("header.skins")} className="py-2" />
        <AppHeaderLink to="/search/chromas" text={t("header.chromas")} className="py-2" />
        <Separator orientation="vertical" className="h-4!" />
        {/* <HoverCard openDelay={0} closeDelay={100} >
          <HoverCardTrigger>
            <AppHeaderItem>{t("header.search")}</AppHeaderItem>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col items-start py-2 px-5">
            <AppHeaderLink to="/search/skins" text={t("header.skins")} className='py-2' />
            <AppHeaderLink to="/search/chromas" text={t("header.chromas")} className='py-2' />
          </HoverCardContent>
        </HoverCard> */}
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
        <AppHeaderLink to="/about" text={t("header.about")} onClick={onCloseSidebar} className="w-full md:w-fit" />
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
