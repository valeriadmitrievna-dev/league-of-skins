import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { useState, type FC, type MouseEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useUpdateUserPasswordMutation } from "@/api";
import { Typography } from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";

interface ChangePasswordFormInput {
  oldPassword: string;
  newPassword: string;
}

const UserSettingsChangePassword: FC = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordFormInput>();
  const [updateUserPasword, { isLoading, error }] = useUpdateUserPasswordMutation();

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  const toggleOldPasswordVisibilityHandler = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setOldPasswordVisible((prev) => !prev);
  };

  const toggleNewPasswordVisibilityHandler = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setNewPasswordVisible((prev) => !prev);
  };

  const savePasswordHandler: SubmitHandler<ChangePasswordFormInput> = async ({ oldPassword, newPassword }) => {
    if (oldPassword && newPassword) {
      const { data } = await updateUserPasword({ oldPassword, newPassword });

      if (data?.success) {
        toast.success(t("changePassword.success"));
      }
    }
  };

  const OldPasswordIcon = oldPasswordVisible ? EyeIcon : EyeOffIcon;
  const NewPasswordIcon = newPasswordVisible ? EyeIcon : EyeOffIcon;

  return (
    <div className="flex flex-col gap-y-4 items-start">
      <Typography.Large>{t("changePassword.title")}</Typography.Large>
      <div className="flex flex-col gap-y-3 w-full">
        <Field className="gap-y-1">
          <FieldContent>
            <InputGroup aria-invalid={errors.oldPassword && "true"} className="plain-input rounded-sm">
              <InputGroupAddon aria-invalid={errors.oldPassword && "true"} className="aria-invalid:text-destructive">
                <LockIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="password"
                className="transition-none aria-invalid:text-destructive aria-invalid:placeholder-destructive/50!"
                placeholder={t("changePassword.old-placeholder")}
                type={oldPasswordVisible ? "text" : "password"}
                aria-invalid={errors.oldPassword && "true"}
                {...register("oldPassword", {
                  disabled: isLoading,
                  required: t("auth.field_required"),
                  minLength: { message: t("auth.field_minlength", { length: 6 }), value: 6 },
                })}
              />
              <InputGroupAddon
                align="inline-end"
                aria-invalid={errors.oldPassword && "true"}
                className="aria-invalid:text-destructive"
              >
                <OldPasswordIcon className="cursor-pointer" onClick={toggleOldPasswordVisibilityHandler} />
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
          {errors.oldPassword?.message && (
            <FieldDescription className="text-destructive">{errors.oldPassword.message}</FieldDescription>
          )}
        </Field>
        <Field className="gap-y-1">
          <FieldContent>
            <InputGroup aria-invalid={errors.newPassword && "true"} className="plain-input rounded-sm">
              <InputGroupAddon aria-invalid={errors.newPassword && "true"} className="aria-invalid:text-destructive">
                <LockIcon />
              </InputGroupAddon>
              <InputGroupInput
                id="new-password"
                className="transition-none aria-invalid:text-destructive aria-invalid:placeholder-destructive/50!"
                placeholder={t("changePassword.new-placeholder")}
                type={newPasswordVisible ? "text" : "password"}
                aria-invalid={errors.newPassword && "true"}
                {...register("newPassword", {
                  disabled: isLoading,
                  required: t("auth.field_required"),
                  minLength: { message: t("auth.field_minlength", { length: 6 }), value: 6 },
                  validate: (value) => value !== getValues("oldPassword") || t("changePassword.error-new-unique"),
                })}
              />
              <InputGroupAddon
                align="inline-end"
                aria-invalid={errors.newPassword && "true"}
                className="aria-invalid:text-destructive"
              >
                <NewPasswordIcon className="cursor-pointer" onClick={toggleNewPasswordVisibilityHandler} />
              </InputGroupAddon>
            </InputGroup>
          </FieldContent>
          {errors.newPassword?.message && (
            <FieldDescription className="text-destructive">{errors.newPassword.message}</FieldDescription>
          )}
        </Field>
      </div>
      <div className="flex items-center gap-x-2">
        <Button size="sm" disabled={isLoading} onClick={handleSubmit(savePasswordHandler)}>
          {isLoading && <Spinner />}
          {t("changePassword.submit")}
        </Button>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {error && <Typography.Small className="text-destructive">{(error as any)?.data?.message}</Typography.Small>}
      </div>
    </div>
  );
};

export default UserSettingsChangePassword;
