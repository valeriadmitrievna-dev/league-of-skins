import { createApi } from "@reduxjs/toolkit/query/react";

import { makeBaseQueryWithReauth } from "../queries";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: makeBaseQueryWithReauth(`${import.meta.env.VITE_API_URL}/api`),
  tagTypes: ["User", "OwnedSkins", "OwnedChromas", "Stats", "Wishlists"],
  endpoints: (build) => ({
    updateAppData: build.mutation<string, { adminKey: string }>({
      query: ({ adminKey }) => ({
        url: "/update-app-data",
        method: "get",
        params: { adminKey },
      }),
    }),
    uploadPrices: build.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file, file.name);

        return {
          url: "/upload-prices",
          method: "post",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUpdateAppDataMutation, useUploadPricesMutation } = baseApi;
