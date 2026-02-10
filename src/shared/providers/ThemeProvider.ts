import { useEffect, type FC, type PropsWithChildren } from "react";
import type { Theme } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, appThemeSelector } from "@/store";

interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const theme = useSelector(appThemeSelector);

  const changeTheme = (newTheme: Theme) => {
    if (theme !== newTheme) {
      dispatch(setTheme(newTheme));
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      changeTheme(systemTheme);
      root.classList.add(systemTheme);
      return;
    }

    changeTheme(theme);
    root.classList.add(theme);
  }, [theme]);

  return children;
};

export default ThemeProvider;
