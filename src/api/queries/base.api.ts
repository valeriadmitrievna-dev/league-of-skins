import { createApi } from "@reduxjs/toolkit/query/react";

import { makeBaseQueryWithReauth } from '../queries';

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: makeBaseQueryWithReauth(`${import.meta.env.VITE_API_URL}/api`),
  tagTypes: ["User", "OwnedSkins", "OwnedChromas", "Stats", "Wishlists"],
  endpoints: () => ({}),
});
