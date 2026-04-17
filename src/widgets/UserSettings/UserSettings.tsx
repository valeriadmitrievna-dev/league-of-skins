import { BrickWallShieldIcon, SettingsIcon, SlidersHorizontalIcon, UserRoundKeyIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useTranslation } from "react-i18next";

import { useGetUserQuery } from "@/api";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import UserSettingsAdministration from "./UserSettingsAdministration";
import UserSettingsCommon from "./UserSettingsCommon";
import UserSettingsSecurity from "./UserSettingsSecurity";
import UserSettingsTab from "./UserSettingsTab";

const UserSettings: FC = () => {
  const { t } = useTranslation();

  const [tab, setTab] = useState("administration");

  const { data: user, isLoading: isUserLoading } = useGetUserQuery();

  const changeTabHandler = (tabId: string) => {
    if (tabId !== tab) setTab(tabId);
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
            {user?.role === "admin" && (
              <UserSettingsTab
                id="administration"
                title={t("userSettings.tab-administration")}
                icon={BrickWallShieldIcon}
                active={tab === "administration"}
                onClick={changeTabHandler}
                className="grow"
              />
            )}
          </div>
        </div>
        <div className="h-full overflow-hidden p-4">
          <DialogTitle className="opacity-0 h-0">{t("app.user-settings")}</DialogTitle>

          {isUserLoading ? (
            <div className="p-2">
              <Skeleton className="h-7 w-[50%]" />
              <Skeleton className="mt-4 h-9" />
              <Skeleton className="mt-3 h-9" />
            </div>
          ) : (
            <div className="h-full overflow-auto scrollbar">
              {tab === "common" && <UserSettingsCommon user={user} />}
              {tab === "security" && <UserSettingsSecurity />}
              {tab === "administration" && <UserSettingsAdministration />}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
