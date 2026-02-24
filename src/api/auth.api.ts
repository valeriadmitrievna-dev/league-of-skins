import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AuthResponse, LoginRequest, RegistrationRequest } from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/auth`,
  }),
  endpoints: (build) => ({
    registration: build.mutation<AuthResponse, RegistrationRequest>({
      query: (body) => ({ method: "post", url: "/registration", body }),
    }),
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ method: "post", url: "/login", body }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApi;
