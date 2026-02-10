import type { RootState } from "./store";

export const appThemeSelector = (state: RootState) => state.app.theme;
export const appLanguageSelector = (state: RootState) => state.app.language;
