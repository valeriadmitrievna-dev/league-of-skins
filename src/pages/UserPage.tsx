import { appAuthSelector } from "@/store";
import Settings from "@/widgets/Settings";
import { useEffect, type FC } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserPage: FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(appAuthSelector);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <div className="grid grid-cols-[1fr_420px] gap-4">
      <div className="user-info flex flex-col gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="w-full h-48 border border-dashed rounded-md border-foreground/25 text-neutral-300 dark:text-neutral-600 flex items-center justify-center"
          >
            random user info
          </div>
        ))}
      </div>
      <Settings />
    </div>
  );
};

export default UserPage;
