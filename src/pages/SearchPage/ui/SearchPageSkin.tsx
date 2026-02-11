import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const SearchPageSkin: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="">
      <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => navigate(-1)}>
        <ChevronLeftIcon />
        {t("shared.back")}
      </Button>
    </div>
  );
};

export default SearchPageSkin;
