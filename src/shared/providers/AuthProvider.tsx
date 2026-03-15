import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useSearchParams } from "react-router";

import { appAuthSelector } from "@/store";

const AuthSignProvider: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect')
  const isAuth = useSelector(appAuthSelector);

  useEffect(() => {
    if (isAuth) {
      navigate(redirect || '/');
    }
  }, [isAuth]);

  return <Outlet />;
};

export default AuthSignProvider;
