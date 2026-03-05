import type { FC } from "react";
import { Button, buttonVariants } from "./ui/button";
import { NavLink } from "react-router";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

interface AppHeaderLinkProps {
  to: string;
  text: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  disabled?: boolean;
}

const AppHeaderLink: FC<AppHeaderLinkProps> = ({ to, text, variant = "ghost", disabled }) => {
  return (
    <Button className={"text-base"} variant={variant} asChild>
      <NavLink
        to={to}
        className={cn("aria-[current=page]:text-background aria-[current=page]:bg-foreground", {
          "pointer-events-none opacity-50": disabled,
        })}
      >
        {text}
      </NavLink>
    </Button>
  );
};

export default AppHeaderLink;
