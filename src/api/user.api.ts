import type { IUser } from '@/types/user';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders(headers) {
      const token = localStorage.getItem("access-token");
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUser: build.query<IUser, void>({
      query: () => "/user",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
