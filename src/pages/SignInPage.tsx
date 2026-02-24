import { useLoginMutation } from "@/api";
import { Button } from "@/components/ui/button";
import { setAppAuth } from '@/store';
import { AuthForm } from "@/widgets/AuthForm";
import { LockIcon, MailIcon } from "lucide-react";
import { useState, type FC } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router";

const SignInPage: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { isLoading }] = useLoginMutation();

  const submitHandler = async () => {
    const { data, error } = await loginMutation({ email, password });

    if (data && !error) {
      localStorage.setItem('access-token', data.access);
      dispatch(setAppAuth(true));
    }
  };

  return (
    <AuthForm.Wrapper>
      <AuthForm.Form
        title="Sign In"
        onSubmit={submitHandler}
        loading={isLoading}
        extra={
          <p>
            Don't have an account?{" "}
            <Button variant="link" className="p-0 px-1" asChild>
              <NavLink to="/auth/signup">Sign up</NavLink>
            </Button>
          </p>
        }
      >
        <AuthForm.TextInput
          id="email"
          icon={<MailIcon />}
          placeholder="Enter email"
          type="email"
          value={email}
          onValueChange={setEmail}
          disabled={isLoading}
        />
        <AuthForm.TextInput
          id="password"
          icon={<LockIcon />}
          placeholder="Enter password"
          type="password"
          value={password}
          onValueChange={setPassword}
          disabled={isLoading}
        />
      </AuthForm.Form>
    </AuthForm.Wrapper>
  );
};

export default SignInPage;
