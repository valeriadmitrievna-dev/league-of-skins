import { useCreateWishlistMutation, useUpdateWishlistMutation } from "@/api";

export const useCreateWishlist = () => {
  const [createWishlist, args] = useCreateWishlistMutation();

  const [updateWishlist] = useUpdateWishlistMutation();

  const createWishlistHandler = async (wishlistName: string, skinContentId?: string) => {
    try {
      const newWishlist = await createWishlist({ name: wishlistName });

      if (skinContentId) {
        await updateWishlist({ wishlistId: newWishlist?.data?._id ?? "", body: { addIds: [skinContentId] } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { createWishlistHandler, ...args };
};
