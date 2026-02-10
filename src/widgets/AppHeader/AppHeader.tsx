import { type FC } from "react";
import s from "./AppHeader.module.scss";
import AppLogo from "@/components/AppLogo/AppLogo";
import { NavLink } from "react-router";
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const AppHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={s.appHeader}>
      <NavLink to='/'>
        <AppLogo />
      </NavLink>
      <nav className={s.appHeaderNavigation}>
        <NavLink to='/support'>Support project</NavLink>
        <NavLink to='/wishlists'>{t('app.wishlists')}</NavLink>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </nav>
    </div>
  );
};

export default AppHeader;
