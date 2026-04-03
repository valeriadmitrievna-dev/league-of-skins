import type { FC } from "react";
import { NavLink } from "react-router";

import { cn } from "@/shared/utils/cn";

interface AppHeaderLinkProps {
  className?: string;
  to: string;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const AppHeaderLink: FC<AppHeaderLinkProps> = ({ className, to, text, disabled, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={cn(
        "group relative font-medium text-center text-muted-foreground aria-[current=page]:text-primary",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {text}

      {/* <div className='hidden group-aria-[current=page]:block absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-(--primary) to-transparent' /> */}
    </NavLink>
  );
};

export default AppHeaderLink;
