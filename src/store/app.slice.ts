import type { Theme } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  language: string;
  theme: Theme;
}

const initialState: AppState = {
  language: localStorage.getItem("language") || navigator.language.replace("-", "_") || "en_US",
  theme: (localStorage.getItem("theme") as Theme) || "system",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload;
      localStorage.setItem("language", payload);
    },
    setTheme: (state, { payload }: PayloadAction<Theme>) => {
      console.log("[DEV]", "set theme:", payload);
      state.theme = payload;
      localStorage.setItem("theme", payload);
    },
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        console.log("[DEV]", "toggle theme:", "light");
        state.theme = "light";
        localStorage.setItem("theme", "light");
      } else if (state.theme === "light") {
        console.log("[DEV]", "toggle theme:", "dark");
        state.theme = "dark";
        localStorage.setItem("theme", "dark");
      }
    },
  },
});

export const { setLanguage, setTheme, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
