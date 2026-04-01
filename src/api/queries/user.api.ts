import type { UserDto } from "@/types/user";

import type { UpdateUserPasswordRequest } from "../types";
import { baseApi } from "./base.api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<UserDto, void>({
      query: () => "/users",
      providesTags: ["User"],
    }),
    updateUserPassword: build.mutation<{ success: true }, UpdateUserPasswordRequest>({
      query: (body) => ({
        url: "/users/password",
        method: "put",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserPasswordMutation } = userApi;
