import { MoonIcon, SunIcon } from "lucide-react";
import type { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { appThemeSelector } from "@/store/app/app.selectors";
import { toggleTheme } from "@/store/app/app.slice";

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(appThemeSelector);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button type="button" variant="outline" size="icon" onClick={toggleThemeHandler}>
      {theme === "dark" && <SunIcon />}
      {theme === "light" && <MoonIcon />}
    </Button>
  );
};

export default ThemeSwitcher;
