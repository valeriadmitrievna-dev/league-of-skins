import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Theme } from "@/types/shared";
import type { SkinDto } from "@/types/skin";

export interface AppState {
  language: string;
  theme: Theme;
  isAuth: boolean;
  addSkinsWaiting: SkinDto["id"][];
  addWaitingFrom: string | null;
  skinsFound: number;
}

const initialState: AppState = {
  language: localStorage.getItem("language") || navigator.language.replace("-", "_") || "en",
  theme: (localStorage.getItem("theme") as Theme) || "system",
  isAuth: !!localStorage.getItem("access-token"),
  addSkinsWaiting: [],
  addWaitingFrom: null,
  skinsFound: 0,
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
      localStorage.setItem("theme", payload);
    },
    toggleTheme: (state) => {
      if (state.theme === "dark") {
        state.theme = "light";
        localStorage.setItem("theme", "light");
      } else if (state.theme === "light") {
        state.theme = "dark";
        localStorage.setItem("theme", "dark");
      }
    },
    setAppAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuth = payload;
    },
    setAddSkinsWaiting: (state, { payload }: PayloadAction<AppState["addSkinsWaiting"]>) => {
      state.addSkinsWaiting = payload;
    },
    setSkinsFound: (state, { payload }: PayloadAction<number>) => {
      state.skinsFound = payload;
    },
  },
});

export const { setLanguage, setTheme, toggleTheme, setAppAuth, setAddSkinsWaiting, setSkinsFound } = appSlice.actions;

export default appSlice.reducer;
