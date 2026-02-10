import type { RootState } from "./store";

export const appThemeSelector = (state: RootState) => state.app.theme;
