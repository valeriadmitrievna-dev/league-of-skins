import { LogOutIcon, SettingsIcon, SlidersHorizontalIcon, UserRoundKeyIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useGetUserQuery, userApi } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { setAppAuth } from "@/store";

import UserSettingsSecurity from "./UserSettingsSecurity";
import UserSettingsTab from "./UserSettingsTab";

const UserSettings: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("common");

  const { data: user, isLoading: isUserLoading } = useGetUserQuery();

  const changeTabHandler = (tabId: string) => {
    if (tabId !== tab) setTab(tabId);
  };

  const logoutHandler = () => {
    localStorage.removeItem("access-token");

    dispatch(userApi.util.resetApiState());
    dispatch(setAppAuth(false));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-2xl! p-0 h-full max-h-140 flex flex-col md:grid grid-cols-[220px_1fr] gap-0! overflow-hidden"
        showCloseButton={false}
      >
        <div className="h-fit md:h-full bg-muted border-r flex flex-col gap-y-6 p-4">
          <div className="flex md:flex-col gap-2">
            <UserSettingsTab
              id="common"
              title={t("userSettings.tab-common")}
              icon={SlidersHorizontalIcon}
              active={tab === "common"}
              onClick={changeTabHandler}
              className="grow"
            />
            <UserSettingsTab
              id="security"
              title={t("userSettings.tab-security")}
              icon={UserRoundKeyIcon}
              active={tab === "security"}
              onClick={changeTabHandler}
              className="grow"
            />
          </div>
        </div>
        <div className="h-full overflow-hidden p-4">
          <DialogTitle className="opacity-0 h-0">User Settings</DialogTitle>

          {isUserLoading ? (
            <div className="p-2">
              <Skeleton className="h-7 w-[50%]" />
              <Skeleton className="mt-4 h-9" />
              <Skeleton className="mt-3 h-9" />
            </div>
          ) : (
            <div className="h-full overflow-auto scrollbar">
              {tab === "common" && (
                <div className="h-full flex flex-col justify-between p-2">
                  <div className="flex flex-col gap-4">
                    <Typography.Large>User Settings</Typography.Large>
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
              )}
              {tab === "security" && <UserSettingsSecurity />}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
