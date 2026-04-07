import { useCreateWishlistMutation, useUpdateWishlistMutation } from "@/api";

export const useCreateWishlist = () => {
  const [createWishlist, args] = useCreateWishlistMutation();

  const [updateWishlist] = useUpdateWishlistMutation();

  const createWishlistHandler = async (wishlistName: string, skinContentIds?: string[], chromaContentIds?: string[]) => {
    try {
      const newWishlist = await createWishlist({ name: wishlistName });

      if (skinContentIds?.length) {
        await updateWishlist({
          wishlistId: newWishlist?.data?._id ?? "",
          body: { addSkinIds: skinContentIds, addChromaIds: chromaContentIds },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { createWishlistHandler, ...args };
};
