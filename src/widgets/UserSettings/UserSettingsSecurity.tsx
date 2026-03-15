import type { FC } from "react";

import UserSettingsChangePassword from "./UserSettingsChangePassword";

const UserSettingsSecurity: FC = () => {
  return (
    <div className="p-2 flex flex-col gap-y-4">
      <UserSettingsChangePassword />
    </div>
  );
};

export default UserSettingsSecurity;
