import { baseApi } from "./base.api";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    uploadInventory: build.mutation<boolean, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file, file.name);

        return {
          url: "/users/inventory",
          method: "post",
          body: formData,
        };
      },
      invalidatesTags: ["User", "OwnedSkins", "Stats"],
    }),
  }),
});

export const { useUploadInventoryMutation } = inventoryApi;
