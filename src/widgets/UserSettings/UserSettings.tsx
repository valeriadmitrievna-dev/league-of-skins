import {
  HourglassIcon,
  LogOutIcon,
  SettingsIcon,
  SlidersHorizontalIcon,
  UserRoundIcon,
  UserRoundKeyIcon,
} from "lucide-react";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useGetUserQuery, userApi } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { setAppAuth } from "@/store";

import UserSettingsSecurity from "./UserSettingsSecurity";
import UserSettingsTab from "./UserSettingsTab";


const UserSettings: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tab, setTab] = useState("security");

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
        <Button variant="lol-outline" size="icon">
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full max-w-3xl! p-0 h-full max-h-140 grid grid-cols-[260px_1fr] gap-0! overflow-hidden"
        showCloseButton={false}
      >
        <div className="h-full bg-muted border-r flex flex-col gap-y-6 p-4">
          {isUserLoading ? (
            <Skeleton className="h-10 border!" />
          ) : (
            <div className="flex items-center gap-x-2 rounded-md border p-1 bg-muted-foreground/5">
              <div className="bg-muted-foreground/25 size-8 flex items-center justify-center rounded-sm shrink-0">
                <UserRoundIcon className="size-5" />
              </div>
              <div className="flex flex-col gap-px w-full overflow-hidden">
                <Typography.Small className="truncate">{user?.name}</Typography.Small>
                <Typography.Muted className="text-[11px]/[14px] truncate">{user?.email}</Typography.Muted>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-y-2">
            <UserSettingsTab
              id="common"
              title={t("userSettings.tab-common")}
              icon={SlidersHorizontalIcon}
              active={tab === "common"}
              onClick={changeTabHandler}
            />
            <UserSettingsTab
              id="security"
              title={t("userSettings.tab-security")}
              icon={UserRoundKeyIcon}
              active={tab === "security"}
              onClick={changeTabHandler}
            />
          </div>

          <Button variant="destructive" onClick={logoutHandler} className="mt-auto w-fit">
            <LogOutIcon />
            {t("userSettings.logout")}
          </Button>
        </div>
        <div className="h-full overflow-hidden p-2">
          <div className="h-full overflow-auto scrollbar">
            {tab === "common" && (
              <div className="h-full flex items-center justify-center">
                <HourglassIcon className="text-muted-foreground" />
              </div>
            )}
            {tab === "security" && <UserSettingsSecurity />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
