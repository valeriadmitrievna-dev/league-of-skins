import { type FC } from "react";
import { useParams } from "react-router";

import DetailsWishlistGuestPage from './DetailsWishlistGuestPage';
import DetailsWishlistOwnedPage from "./DetailsWishlistOwnedPage";

const DetailsWishlistPage: FC = () => {
  const { wishlistId } = useParams<{ wishlistId: string }>();

  if (!wishlistId) return null;

  if (wishlistId.includes("-")) {
    return <DetailsWishlistGuestPage link={wishlistId} />;
  }

  return <DetailsWishlistOwnedPage id={wishlistId} />;
};

export default DetailsWishlistPage;
