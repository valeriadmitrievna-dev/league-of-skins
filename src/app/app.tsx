import type { FC } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider, ToastsProvider } from "@/shared/providers";
import { TooltipProvider } from '@/components/ui/tooltip';

const App: FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastsProvider />
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
