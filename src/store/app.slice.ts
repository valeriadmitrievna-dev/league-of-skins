import type { Theme } from "@/shared/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  language: string;
  theme: Theme;
}

const initialState: AppState = {
  language: localStorage.getItem("language") ?? navigator.language.replace("-", "_") ?? "en_US",
  theme: (localStorage.getItem("theme") as Theme) ?? "system",
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
      state.theme = payload;
    },
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
      }

      if (state.theme === "light") {
        state.theme = "dark";
      }
    },
  },
});

export const { setLanguage, setTheme, toggleTheme } = appSlice.actions;

export default appSlice.reducer;
