import { useCreateWishlistMutation, useUpdateWishlistMutation } from "@/api";

export const useCreateWishlist = () => {
  const [createWishlist, args] = useCreateWishlistMutation();

  const [updateWishlist] = useUpdateWishlistMutation();

  const createWishlistHandler = async (wishlistName: string, skinContentIds?: string[]) => {
    try {
      const newWishlist = await createWishlist({ name: wishlistName });

      if (skinContentIds?.length) {
        await updateWishlist({ wishlistId: newWishlist?.data?._id ?? "", body: { addIds: skinContentIds } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createWishlistHandler, ...args };
};
