import { useRegistrationMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { setAppAuth } from "@/store";
import { AuthForm } from "@/widgets/AuthForm";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { type FC } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from 'react-i18next';

interface SignUpFormInput {
  name: string;
  email: string;
  password: string;
}

const SignUpPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInput>();

  const [registrationMutation, { isLoading }] = useRegistrationMutation();

  const submitHandler: SubmitHandler<SignUpFormInput> = async (formData) => {
    const { data, error } = await registrationMutation(formData);

    if (data && !error) {
      localStorage.setItem("access-token", data.access);
      dispatch(setAppAuth(true));
    }
  };

  return (
    <AuthForm.Wrapper>
      <AuthForm.Form
        title={t('auth.signup_title')}
        loading={isLoading}
        submitText={t('auth.submit_signup')}
        onSubmit={handleSubmit(submitHandler)}
        extra={
          <p>
            {t('auth.signup_extra')}{" "}
            <Button variant="link" className="p-0 px-1 h-fit text-base" asChild>
              <NavLink to={`/auth/signin${location.search}`}>{t('auth.signin_link')}</NavLink>
            </Button>
          </p>
        }
      >
        <AuthForm.TextInput
          id="name"
          icon={<UserIcon />}
          placeholder={t('auth.name_placeholder')}
          aria-invalid={errors.name ? "true" : "false"}
          description={errors.name?.message}
          {...register("name", {
            disabled: isLoading,
            required: t('auth.field_required'),
            minLength: { message: t('auth.field_minlength', { length: 6 }), value: 6 },
          })}
        />
        <AuthForm.TextInput
          id="email"
          icon={<MailIcon />}
          placeholder={t('auth.email_placeholder')}
          type="email"
          aria-invalid={errors.email ? "true" : "false"}
          description={errors.email?.message}
          {...register("email", {
            disabled: isLoading,
            required: t('auth.field_required'),
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('auth.email_invalid'),
            },
          })}
        />
        <AuthForm.TextInput
          id="password"
          icon={<LockIcon />}
          placeholder={t('auth.password_placeholder')}
          type="password"
          aria-invalid={errors.password ? "true" : "false"}
          description={errors.password?.message}
          {...register("password", {
            disabled: isLoading,
            required: t('auth.field_required'),
            minLength: { message: t('auth.field_minlength', { length: 6 }), value: 6 },
          })}
        />
      </AuthForm.Form>
    </AuthForm.Wrapper>
  );
};

export default SignUpPage;
