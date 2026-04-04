import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setAppMemoryToken } from "@/store/app/app.slice";

import type { AuthResponse, LoginRequest, RegistrationRequest } from "../types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/auth`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationRequest>({
      query: (body) => ({ method: "post", url: "/signup", body }),
    }),
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ method: "post", url: "/signin", body }),
    }),
    refresh: build.query<AuthResponse, void>({
      query: () => ({ method: "post", url: "/refresh" }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAppMemoryToken(data.access));
        } catch {
          dispatch(setAppMemoryToken(null));
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({ method: "post", url: "/logout" }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useRefreshQuery, useLogoutMutation } = authApi;
