import { GlobeIcon } from "lucide-react";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/shared/constants/languages";
import { appLanguageSelector } from "@/store/app/app.selectors";
import { setLanguage } from "@/store/app/app.slice";

import { Combobox, ComboboxContent, ComboboxItem, ComboboxList, ComboboxTrigger } from "./ui/combobox";

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector(appLanguageSelector);

  const changeLanguageHandler = async (lang: string | null) => {
    if (lang) {
      await i18n.changeLanguage(lang, () => {
        dispatch(setLanguage(lang));
      });
    }
  };

  useEffect(() => {
    if (!language) {
      i18n.changeLanguage("en", () => dispatch(setLanguage("en")));
    }
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return (
    <Combobox
      items={Object.entries(LANGUAGES)}
      value={language}
      onValueChange={changeLanguageHandler}
      inputValue=""
      onInputValueChange={() => {}}
    >
      <ComboboxTrigger
        render={
          <Button variant="outline" size="icon">
            <GlobeIcon />
          </Button>
        }
      />
      <ComboboxContent className="min-w-40 p-1 py-2">
        <ComboboxList className="scrollbar p-0 px-1">
          {([locale, { name }]) => {
            const formattedName = name[0].toUpperCase() + name.slice(1);
            return (
              <ComboboxItem key={locale} value={locale}>
                {formattedName}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default LanguageSwitcher;
