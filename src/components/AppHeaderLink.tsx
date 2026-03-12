import type { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { NavLink } from "react-router";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

interface AppHeaderLinkProps {
  className?: string;
  to: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  disabled?: boolean;
  handleClick?: () => void
}

const AppHeaderLink: FC<AppHeaderLinkProps> = ({className, to, text, variant = "ghost", disabled, handleClick }) => {
  return (
    <Button className={cn("text-base", className)} variant={variant} onClick={handleClick} asChild>
      <NavLink
        to={to}
        className={cn("text-sm aria-[current=page]:text-background! aria-[current=page]:bg-foreground! rounded-none md:rounded-md", {
          "pointer-events-none opacity-50": disabled,
        })}
      >
        {text}
      </NavLink>
    </Button>
  );
};

export default AppHeaderLink;
