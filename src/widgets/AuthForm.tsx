/* eslint-disable react-refresh/only-export-components */
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from '@/components/ui/spinner';
import { cn } from "@/lib/utils";
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from "react";

interface AuthFormTitleProps {
  children: string;
  className?: string;
}

interface AuthFormContainerProps extends PropsWithChildren {
  title?: string;
  onSubmit?: () => void;
  extra?: ReactNode;
  loading?: boolean;
}

interface AuthFormTextInputProps extends Omit<ComponentProps<"input">, "className"> {
  id: string;
  label?: string;
  icon?: ReactNode;
  description?: string;
  onValueChange?: (value: string) => void;
}

const AuthFormWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="h-screen flex flex-col items-center justify-center gap-y-4 p-6">{children}</div>;
};

const AuthFormTitle: FC<AuthFormTitleProps> = ({ children, className }) => {
  return <h1 className={cn("text-2xl font-semibold", className)}>{children}</h1>;
};

const AuthFormContainer: FC<AuthFormContainerProps> = ({ title, children, onSubmit, loading, extra }) => {
  // -- replace card mb
  return (
    <Card className="px-5 py-6 max-w-full w-100 relative">
      <div className="flex items-center justify-end">
        {!!title && <AuthFormTitle className="mr-auto">{title}</AuthFormTitle>}
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col gap-y-4">{children}</div>
      <div className="p-0 flex items-center gap-3">
        <Button size="lg" onClick={onSubmit} disabled={loading}>
          {loading && <Spinner data-icon="inline-start" />}
          Submit
        </Button>
      </div>
      {!!extra && <p className="text-muted-foreground">{extra}</p>}
    </Card>
  );
};

const AuthFormTextInput: FC<AuthFormTextInputProps> = ({
  id,
  label,
  icon,
  description,
  onChange,
  onValueChange,
  ...props
}) => {
  const changeHandler: AuthFormTextInputProps["onChange"] = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.value ?? "");
  };

  return (
    <Field className="gap-y-2">
      {!!label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <FieldContent>
        <InputGroup className="rounded-sm h-10 bg-muted!">
          {!!icon && <InputGroupAddon>{icon}</InputGroupAddon>}
          <InputGroupInput
            id={id}
            className="transition-none autofill:shadow-[inset_0_0_0px_1000px_var(--muted)] autofill:text-foreground!"
            onChange={changeHandler}
            {...props}
          />
        </InputGroup>
        {!!description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
};

export const AuthForm = {
  Wrapper: AuthFormWrapper,
  Title: AuthFormTitle,
  Form: AuthFormContainer,
  TextInput: AuthFormTextInput,
};
