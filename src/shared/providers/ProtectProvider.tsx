import { appAuthSelector } from "@/store";
import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const ProtectProvider: FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(appAuthSelector);

  useEffect(() => {
    if (!isAuth) {
      navigate("/", { replace: true });
    }
  }, [isAuth]);

  return <Outlet />;
};

export default ProtectProvider;
