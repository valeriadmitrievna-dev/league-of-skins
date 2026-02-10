import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { dataApi } from "@/api";

import appReducer from "./app.slice";

export const store = configureStore({
	reducer: {
		app: appReducer,
		[dataApi.reducerPath]: dataApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
