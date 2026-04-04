import type { RootState } from '../types';

export const appThemeSelector = (state: RootState) => state.app.theme;
export const appLanguageSelector = (state: RootState) => state.app.language;
export const appAuthSelector = (state: RootState) => !!state.app.inMemoryToken;
export const appMemoryTokenSelector = (state: RootState) => state.app.inMemoryToken;
export const appAddSkinsWaitingSelector = (state: RootState) => state.app.addSkinsWaiting;
export const appAddChromasWaitingSelector = (state: RootState) => state.app.addChromasWaiting;
export const appSkinsFoundSelector = (state: RootState) => state.app.skinsFound;
export const appChromasFoundSelector = (state: RootState) => state.app.chromasFound;
export const appSkinsLoadingSelector = (state: RootState) => state.app.isSkinsLoading;
export const appChromasLoadingSelector = (state: RootState) => state.app.isChromasLoading;
