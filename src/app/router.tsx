import { createBrowserRouter } from "react-router";
import { LayoutPage } from "@/pages/LayoutPage";
import { SearchPage, SearchPageResults, SearchPageSkin } from "@/pages/SearchPage";
import { AuthProvider } from "@/shared/providers";
import SignUpPage from "@/pages/SignUpPage";
import SignInPage from "@/pages/SignInPage";
import ProtectProvider from "@/shared/providers/ProtectProvider";
import SkinsPage from '@/pages/SkinsPage';

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
          { path: ":skinContentId", element: <SearchPageSkin /> },
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
