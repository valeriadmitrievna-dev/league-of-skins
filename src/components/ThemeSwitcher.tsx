import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { appThemeSelector, toggleTheme } from "@/store";

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector(appThemeSelector);

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button className="cursor-pointer" variant="outline" size="icon" onClick={toggleThemeHandler}>
      {theme === "dark" && <SunIcon />}
      {theme === "light" && <MoonIcon />}
    </Button>
  );
};

export default ThemeSwitcher;
