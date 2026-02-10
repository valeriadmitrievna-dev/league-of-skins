import { createBrowserRouter } from "react-router";
import { LayoutPage } from "@/pages/LayoutPage";
import { SearchPage } from "@/pages/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <SearchPage /> },
      { path: "*", element: "test" },
    ],
  },
  {
    path: "/auth/register",
    element: "register",
  },
]);
