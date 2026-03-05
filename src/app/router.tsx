import { createBrowserRouter, Navigate } from "react-router";
import { AuthProvider } from "@/shared/providers";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import ProtectProvider from "@/shared/providers/ProtectProvider";
import CollectionSkinsPage from "@/pages/CollectionSkinsPage";
import LayoutPage from "@/pages/LayoutPage";
import DetailsSkinPage from "@/pages/DetailsSkinPage";
import AboutPage from "@/pages/AboutPage";
import SearchSkinsPage from "@/pages/SearchSkinsPage";

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
          { path: "companions", element: "Search tft companions (Coming somewhen)" },
        ],
      },

      // details
      { path: "/skins/:skinContentId", element: <DetailsSkinPage /> },

      // user pages
      {
        path: "",
        element: <ProtectProvider />,
        children: [
          { path: "/wishlists", element: <>wishlists</> },
          {
            path: '/collection',
            children: [
              { path: "skins", element: <CollectionSkinsPage /> },
            ]
          }
        ],
      },

      // about
      { path: "/about", element: <AboutPage /> },

      // 404
      { path: "*", element: "404" },
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
