import type { FC } from "react";
import { Outlet } from "react-router";
import AppHeader from "@/widgets/AppHeader";

const LayoutPage: FC = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <AppHeader />
      <div className="h-full p-5 my-container">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
