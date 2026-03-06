import type { ComponentType, FC, SVGProps } from "react";
import { cn } from "@/shared/utils/cn";
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/Typography';

interface UserSettingsTabProps {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  onClick?: (tabId: string) => void;
}

const UserSettingsTab: FC<UserSettingsTabProps> = ({ id, title, icon: Icon, active, onClick }) => {
  const clickHandler = () => {
    onClick?.(id);
  };

  return (
    <Button
      variant="secondary"
      onClick={clickHandler}
      className={cn("justify-start rounded-md p-1! flex items-center gap-x-2", {
        "bg-muted-foreground/5!": active,
      })}
    >
      <Icon className="size-8 p-1.5" />
      <Typography.P>{title}</Typography.P>
    </Button>
  );
};

export default UserSettingsTab;
