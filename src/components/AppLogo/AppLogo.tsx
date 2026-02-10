import { FC } from "react";
import s from "./AppLogo.module.scss";

const AppLogo: FC = () => {
  return (
    <div className={s.appLogo}>
      <div className={s.appLogoIcon} />
      <div className={s.appLogoContent}>
        <span className={s.appLogoName}>League of Skins</span>
        <span className={s.appLogoDescription}>League of Legends Skins Wishlists</span>
      </div>
    </div>
  );
};

export default AppLogo;
