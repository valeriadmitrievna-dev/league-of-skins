import { useEffect, type FC } from "react";
import { Button } from "@/components/ui/button";
import { GlobeIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { appLanguageSelector, setLanguage } from "@/store";
import { LANGUAGES } from "@/shared/constants/languages";

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
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <GlobeIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="overflow-hidden">
        <div className="max-h-48 overflow-auto scrollbar pr-1">
          <ToggleGroup
            type="single"
            orientation="vertical"
            spacing={1}
            className="flex-col items-start w-full"
            value={language}
            onValueChange={changeLanguageHandler}
          >
            {Object.entries(LANGUAGES).map(([locale, { name }]) => {
              const formattedName = name[0].toUpperCase() + name.slice(1);
              return (
                <ToggleGroupItem
                  key={locale}
                  className="w-full flex-col items-start hover:text-foreground"
                  value={locale}
                  aria-label={formattedName}
                >
                  {formattedName}
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
