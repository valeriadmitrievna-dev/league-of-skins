import { type FC } from "react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import AppLogo from "@/components/AppLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-5 py-3 mx-auto w-full xl:max-w-360 2xl:max-w-400">
      <NavLink to="/">
        <AppLogo />
      </NavLink>
      <nav className="flex items-center gap-3">
        <Button className="text-base" variant="ghost" asChild>
          <NavLink to="/support">Support project</NavLink>
        </Button>
        <Button className="text-base" variant="ghost" asChild>
          <NavLink to="/wishlists">{t("app.wishlists")}</NavLink>
        </Button>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </nav>
    </div>
  );
};

export default AppHeader;
