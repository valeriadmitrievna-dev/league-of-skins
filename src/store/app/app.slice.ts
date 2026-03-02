import type { ChromaDto } from "@/types/chroma";
import type { Theme } from "@/types/shared";
import type { SkinDto } from "@/types/skin";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  language: string;
  theme: Theme;
  isAuth: boolean;
  addSkinWaiting: SkinDto["id"] | null;
  addChromaWaiting: ChromaDto["id"] | null;
  addWaitingFrom: string | null;
}

const initialState: AppState = {
  language: localStorage.getItem("language") || navigator.language.replace("-", "_") || "en",
  theme: (localStorage.getItem("theme") as Theme) || "system",
  isAuth: !!localStorage.getItem("access-token"),
  addSkinWaiting: null,
  addChromaWaiting: null,
  addWaitingFrom: null,
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
    setAddSkinWaiting: (state, { payload }: PayloadAction<AppState["addSkinWaiting"]>) => {
      state.addSkinWaiting = payload;
    },
    setAddChromaWaiting: (state, { payload }: PayloadAction<AppState["addChromaWaiting"]>) => {
      state.addChromaWaiting = payload;
    },
  },
});

export const { setLanguage, setTheme, toggleTheme, setAppAuth, setAddSkinWaiting, setAddChromaWaiting } = appSlice.actions;

export default appSlice.reducer;
