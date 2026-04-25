import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import i18n from '@/i18n/i18n';

export interface AppState {
  language: string;
  inMemoryToken: string | null;
  addSkinsWaiting: string[];
  addChromasWaiting: string[];

  skinsFound: number;
  chromasFound: number;

  isSkinsLoading: boolean;
  isChromasLoading: boolean;
}

const getInitialLanguage = () => {
  const lang = i18n.language || 'en';
  return lang.split(/[-_]/)[0];
};

const initialState: AppState = {
  language: getInitialLanguage(),
  inMemoryToken: null,
  addSkinsWaiting: [],
  addChromasWaiting: [],
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
    setAppMemoryToken: (state, { payload }: PayloadAction<string | null>) => {
      state.inMemoryToken = payload;
    },
    setAddSkinsWaiting: (state, { payload }: PayloadAction<AppState["addSkinsWaiting"]>) => {
      state.addSkinsWaiting = payload;
    },
    setAddChromasWaiting: (state, { payload }: PayloadAction<AppState["addChromasWaiting"]>) => {
      state.addChromasWaiting = payload;
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
  setAppMemoryToken,
  setAddChromasWaiting,
  setAddSkinsWaiting,
  setSkinsFound,
  setChromasFound,
  setSkinsLoading,
  setChromasLoading,
} = appSlice.actions;

export default appSlice.reducer;
