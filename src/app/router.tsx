import { createBrowserRouter } from "react-router";
import { AuthProvider } from "@/shared/providers";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import ProtectProvider from "@/shared/providers/ProtectProvider";
import SkinsPage from "@/pages/SkinsPage";
import SearchPage from "@/pages/SearchPage";
import SearchPageResults from "@/pages/SearchPageResults";
import LayoutPage from "@/pages/LayoutPage";
import SkinDetailsPage from "@/pages/SkinDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "",
        element: <SearchPage />,
        children: [
          { index: true, element: <SearchPageResults /> },
          // { path: ":skinContentId", element: <SearchPageSkin /> },
        ],
      },
      {
        path: "",
        element: <ProtectProvider />,
        children: [
          { path: "/wishlists", element: <>wishlists</> },
          {
            path: "/skins",
            element: <SkinsPage />,
          },
        ],
      },
      {
        path: "/skins/:skinContentId",
        element: <SkinDetailsPage />,
      },
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
