import { createBrowserRouter, Navigate } from "react-router";

import AboutPage from "@/pages/AboutPage";
import CollectionPage from "@/pages/CollectionPage";
import DetailsSkinPage from "@/pages/DetailsSkinPage";
import DetailsWishlistPage from "@/pages/DetailsWishlistPage";
import LayoutPage from "@/pages/LayoutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import SearchChromasPage from "@/pages/SearchChromasPage";
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
      { path: "", element: <Navigate to="/search/skins" replace /> },

      // search
      {
        path: "/search",
        children: [
          { index: true, element: <Navigate to="/search/skins" replace /> },
          { path: "skins", element: <SearchSkinsPage /> },
          { path: "chromas", element: <SearchChromasPage /> },
          { path: "companions", element: "Search tft companions (Coming somewhen)" },
        ],
      },

      { path: "/skins/:skinContentId", element: <DetailsSkinPage /> },

      // user pages
      {
        path: "",
        element: <ProtectProvider />,
        children: [
          { path: "/wishlists", element: <WishlistsPage /> },
          { path: "/wishlists/:wishlistId", element: <DetailsWishlistPage /> },
          { path: "/collection", element: <CollectionPage />},
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
