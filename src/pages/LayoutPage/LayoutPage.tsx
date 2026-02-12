import type { FC } from "react";
import { Outlet } from "react-router";
import AppHeader from '@/widgets/AppHeader';

const LayoutPage: FC = () => {
  return (
    <div className="max-h-screen flex flex-col no-scrollbar">
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
