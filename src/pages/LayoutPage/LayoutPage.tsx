import type { FC } from "react";
import { Outlet } from "react-router";
import AppHeader from '@/widgets/AppHeader/AppHeader';

const LayoutPage: FC = () => {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default LayoutPage;
