import { useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { appLanguageSelector, setLanguage } from "@/store";

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(appLanguageSelector);

  const changeLanguageHandler = async (newLanguage: string) => {
    await i18n.changeLanguage(newLanguage, () => {
      dispatch(setLanguage(newLanguage));
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline" size="icon">
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ToggleGroup
          type="single"
          orientation="vertical"
          spacing={1}
          className="flex-col items-start w-full"
          value={language}
          onValueChange={changeLanguageHandler}
        >
          <ToggleGroupItem className="cursor-pointer w-full flex-col items-start hover:text-foreground" value="ru" aria-label="Russian">
            Russian
          </ToggleGroupItem>
          <ToggleGroupItem className="cursor-pointer w-full flex-col items-start hover:text-foreground" value="en" aria-label="English">
            English
          </ToggleGroupItem>
        </ToggleGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
