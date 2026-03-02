import { useLoginMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { setAppAuth } from '@/store';
import { AuthForm } from "@/widgets/AuthForm";
import { LockIcon, MailIcon } from "lucide-react";
import { type FC } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router";

interface SignInFormInput {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInput>();

  const [loginMutation, { isLoading }] = useLoginMutation();

  const submitHandler: SubmitHandler<SignInFormInput> = async (formData) => {
    const { data, error } = await loginMutation(formData);

    if (data && !error) {
      localStorage.setItem('access-token', data.access);
      dispatch(setAppAuth(true));
    }
  };

  return (
    <AuthForm.Wrapper>
      <AuthForm.Form
        title={t('auth.signin_title')}
        submitText={t('auth.submit_signin')}
        onSubmit={handleSubmit(submitHandler)}
        loading={isLoading}
        extra={
          <p>
            {t('auth.signin_extra')}{" "}
            <Button variant="link" className="p-0 px-1 h-fit text-base" asChild>
              <NavLink to="/auth/signup">{t('auth.signup_link')}</NavLink>
            </Button>
          </p>
        }
      >
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

export default SignInPage;
