import { Button } from "@/components/ui/button";
import { AuthForm } from "@/widgets/AuthForm";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import type { FC } from "react";
import { NavLink } from "react-router";

const SignUpPage: FC = () => {
  return (
    <AuthForm.Wrapper>
      <AuthForm.Form
        title="Sign Up"
        extra={
          <p>
            Already have an account?{" "}
            <Button variant="link" className="p-0 px-1" asChild>
              <NavLink to="/signin">Sign in</NavLink>
            </Button>
          </p>
        }
      >
        <AuthForm.TextInput id="name" icon={<UserIcon />} placeholder="Enter your name" />
        <AuthForm.TextInput id="email" icon={<MailIcon />} placeholder="Enter email" type="email" />
        <AuthForm.TextInput id="password" icon={<LockIcon />} placeholder="Enter password" type="password" />
      </AuthForm.Form>
    </AuthForm.Wrapper>
  );
};

export default SignUpPage;
