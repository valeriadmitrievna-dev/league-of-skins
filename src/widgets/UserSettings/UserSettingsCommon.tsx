import { LogOutIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useLogoutMutation, userApi } from "@/api";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAppMemoryToken } from "@/store/app/app.slice";
import type { UserDto } from "@/types/user";

interface UserSettingsCommonProps {
  user: UserDto | undefined;
}

const UserSettingsCommon: FC<UserSettingsCommonProps> = ({ user }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [logoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutMutation();
    dispatch(userApi.util.resetApiState());
    dispatch(setAppMemoryToken(null));
  };

  return (
    <div className="h-full flex flex-col justify-between p-2">
      <div className="flex flex-col gap-4">
        <Typography.Large>{t("app.user-settings")}</Typography.Large>
        <div className="flex flex-col gap-3">
          <Input id="name" value={user?.name} disabled />
          <Input id="email" value={user?.email} disabled />
        </div>
      </div>

      <Button variant="destructive" onClick={logoutHandler} className="w-full md:w-fit">
        <LogOutIcon />
        {t("userSettings.logout")}
      </Button>
    </div>
  );
};

export default UserSettingsCommon;
