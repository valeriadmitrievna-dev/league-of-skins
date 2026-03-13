import type { FC } from "react";
import { NavLink } from "react-router";
import { cn } from "@/shared/utils/cn";

interface AppHeaderLinkProps {
  className?: string;
  to: string;
  text: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const AppHeaderLink: FC<AppHeaderLinkProps> = ({ className, to, text, disabled, handleClick }) => {
  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={cn(
        "text-sm text-center aria-[current=page]:text-pink-500",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {text}
    </NavLink>
  );
};

export default AppHeaderLink;
