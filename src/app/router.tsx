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
      { path: "*", element: "404" },
    ],
  },
  {
    path: "/signup",
    element: <div className='px-5 py-3 mx-auto w-full xl:max-w-360 2xl:max-w-400'>Sign Up</div>,
  },
  {
    path: "/signin",
    element: <div className='px-5 py-3 mx-auto w-full xl:max-w-360 2xl:max-w-400'>Sign In</div>,
  },
]);
