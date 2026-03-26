import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import { useState, type FC, type MouseEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router";

import { useRegistrationMutation } from "@/api";
import CustomHead from "@/components/CustomMetaHead";
import { Button } from "@/components/ui/button";
import { setAppAuth } from "@/store";
import { AuthForm } from "@/widgets/AuthForm";

interface SignUpFormInput {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInput>();

  const [registrationMutation, { isLoading }] = useRegistrationMutation();

  const submitHandler: SubmitHandler<SignUpFormInput> = async (formData) => {
    const { data, error } = await registrationMutation(formData);

    if (data && !error) {
      localStorage.setItem("access-token", data.access);
      dispatch(setAppAuth(true));
    }
  };

  const togglePasswordVisibilityHandler = (event: MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setPasswordVisible((prev) => !prev);
  };

  const PasswordIcon = isPasswordVisible ? EyeIcon : EyeOffIcon;

  return (
    <>
      <CustomHead>
        <title>League of Skins | Sign Up</title>
        <meta name="description" content="Create new account" />
      </CustomHead>
      <AuthForm.Wrapper>
        <AuthForm.Form
          title={t("auth.signup_title")}
          loading={isLoading}
          submitText={t("auth.submit_signup")}
          onSubmit={handleSubmit(submitHandler)}
          extra={
            <>
              {t("auth.signup_extra")}{" "}
              <Button variant="link" className="p-0 px-1 h-fit text-base" asChild>
                <NavLink to={`/auth/signin${location.search}`}>{t("auth.signin_link")}</NavLink>
              </Button>
            </>
          }
        >
          <AuthForm.TextInput
            id="name"
            leftIcon={<UserIcon />}
            placeholder={t("auth.name_placeholder")}
            aria-invalid={errors.name ? "true" : "false"}
            description={errors.name?.message}
            {...register("name", {
              disabled: isLoading,
              required: t("auth.field_required"),
              minLength: { message: t("auth.field_minlength", { length: 6 }), value: 6 },
            })}
          />
          <AuthForm.TextInput
            id="email"
            leftIcon={<MailIcon />}
            placeholder={t("auth.email_placeholder")}
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            description={errors.email?.message}
            {...register("email", {
              disabled: isLoading,
              required: t("auth.field_required"),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t("auth.email_invalid"),
              },
            })}
          />
          <AuthForm.TextInput
            id="password"
            leftIcon={<LockIcon />}
            rightIcon={<PasswordIcon className="cursor-pointer" onClick={togglePasswordVisibilityHandler} />}
            placeholder={t("auth.password_placeholder")}
            type={isPasswordVisible ? "text" : "password"}
            aria-invalid={errors.password ? "true" : "false"}
            description={errors.password?.message}
            {...register("password", {
              disabled: isLoading,
              required: t("auth.field_required"),
              minLength: { message: t("auth.field_minlength", { length: 6 }), value: 6 },
            })}
          />
        </AuthForm.Form>
      </AuthForm.Wrapper>
    </>
  );
};

export default SignUpPage;
