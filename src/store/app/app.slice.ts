import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Theme } from "@/types/shared";
import type { SkinDto } from "@/types/skin";

export interface AppState {
  language: string;
  theme: Theme;
  inMemoryToken: string | null;
  addSkinsWaiting: SkinDto["id"][];
  addWaitingFrom: string | null;

  skinsFound: number;
  chromasFound: number;

  isSkinsLoading: boolean;
  isChromasLoading: boolean;
}

const initialState: AppState = {
  language: localStorage.getItem("language") || navigator.language.replace("-", "_") || "en",
  theme: (localStorage.getItem("theme") as Theme) || "system",
  inMemoryToken: null,
  addSkinsWaiting: [],
  addWaitingFrom: null,
  skinsFound: 0,
  chromasFound: 0,
  isSkinsLoading: true,
  isChromasLoading: true,
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
    setAppMemoryToken: (state, { payload }: PayloadAction<string | null>) => {
      state.inMemoryToken = payload;
    },
    setAddSkinsWaiting: (state, { payload }: PayloadAction<AppState["addSkinsWaiting"]>) => {
      state.addSkinsWaiting = payload;
    },
    setSkinsFound: (state, { payload }: PayloadAction<number>) => {
      state.skinsFound = payload;
    },
    setChromasFound: (state, { payload }: PayloadAction<number>) => {
      state.chromasFound = payload;
    },
    setSkinsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isSkinsLoading = payload;
    },
    setChromasLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isChromasLoading = payload;
    },
  },
});

export const {
  setLanguage,
  setTheme,
  toggleTheme,
  setAppMemoryToken,
  setAddSkinsWaiting,
  setSkinsFound,
  setChromasFound,
  setSkinsLoading,
  setChromasLoading,
} = appSlice.actions;

export default appSlice.reducer;
