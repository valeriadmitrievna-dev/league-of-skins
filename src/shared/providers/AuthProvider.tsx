import { appAuthSelector } from "@/store";
import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const AuthProvider: FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(appAuthSelector);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return <Outlet />;
};

export default AuthProvider;
