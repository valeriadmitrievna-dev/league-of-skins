import type { ComponentType, FC, SVGProps } from "react";

import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/cn";

interface UserSettingsTabProps {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  active?: boolean;
  onClick?: (tabId: string) => void;
}

const UserSettingsTab: FC<UserSettingsTabProps> = ({ id, title, icon: Icon, className, active, onClick }) => {
  const clickHandler = () => {
    onClick?.(id);
  };

  return (
    <Button
      variant="ghost"
      onClick={clickHandler}
      className={cn(className, "justify-start rounded-md p-1! flex items-center gap-x-2", {
        "bg-secondary! text-secondary-foreground!": active,
      })}
    >
      <Icon className="size-8 p-1.5" />
      <Typography.P>{title}</Typography.P>
    </Button>
  );
};

export default UserSettingsTab;
