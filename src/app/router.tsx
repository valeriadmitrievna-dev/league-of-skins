import { createBrowserRouter } from "react-router";
import { LayoutPage } from "@/pages/LayoutPage";
import { SearchPage, SearchPageResults, SearchPageSkin } from "@/pages/SearchPage";

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
          { path: ':skinContentId', element: <SearchPageSkin /> },
        ],
      },
      { path: '/wishlists', element: <>wishlists</> },
      { path: "*", element: "test" },
    ],
  },
  {
    path: "/auth/register",
    element: "register",
  },
]);
