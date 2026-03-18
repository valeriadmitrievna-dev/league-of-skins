import type { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider, ToastsProvider } from "@/shared/providers";
import { store } from "@/store";

import { router } from "./router";

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastsProvider />
        <TooltipProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
