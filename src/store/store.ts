import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authApi, dataApi, userApi } from "@/api";

import appReducer from "./app.slice";
import filtersReducer from "./filters.slice";
import { errorMiddleware } from '@/api/error.middleware';

export const store = configureStore({
  reducer: {
    app: appReducer,
    filters: filtersReducer,
    [authApi.reducerPath]: authApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      errorMiddleware,
      authApi.middleware,
      dataApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
