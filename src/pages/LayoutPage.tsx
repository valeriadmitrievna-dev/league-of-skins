import type { FC } from "react";
import { Outlet } from "react-router";
import AppHeader from "@/widgets/AppHeader";

const LayoutPage: FC = () => {
  return (
    <div className="max-h-screen flex flex-col no-scrollbar">
      <AppHeader />
      <div className="w-full p-5 mx-auto xl:max-w-360 2xl:max-w-400">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
