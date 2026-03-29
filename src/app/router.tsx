import { createBrowserRouter, Navigate } from "react-router";

import AboutPage from "@/pages/AboutPage";
import CollectionSkinsPage from "@/pages/CollectionSkinsPage";
import DetailsSkinPage from "@/pages/DetailsSkinPage";
import DetailsWishlistPage from "@/pages/DetailsWishlistPage";
import LayoutPage from "@/pages/LayoutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SearchSkinsPage from "@/pages/SearchSkinsPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import WishlistsPage from "@/pages/WishlistsPage";
import { AuthProvider } from "@/shared/providers";
import ProtectProvider from "@/shared/providers/ProtectProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { path: "", element: <Navigate to="/search/skins" /> },

      // search
      {
        path: "/search",
        children: [
          { index: true, element: <Navigate to="/search/skins" /> },
          { path: "skins", element: <SearchSkinsPage /> },
          { path: "chromas", element: "Search chromas (Coming soon)" },
          { path: "companions", element: "Search tft companions (Coming somewhen)" },
        ],
      },

      // details
      { path: "/skins/:skinContentId", element: <DetailsSkinPage /> },
      { path: "/wishlists/:wishlistId", element: <DetailsWishlistPage /> },

      // user pages
      {
        path: "",
        element: <ProtectProvider />,
        children: [
          { path: "/wishlists", element: <WishlistsPage /> },
          {
            path: "/collection",
            // element: <Navigate to="/collection/skins" />,
            children: [{ path: "skins", element: <CollectionSkinsPage /> }],
          },
        ],
      },

      // about
      { path: "/about", element: <AboutPage /> },

      // 404
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthProvider />,
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
    ],
  },
]);
