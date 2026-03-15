import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";


import enErrors from './locales/en.errors.locale.json';
import en from "./locales/en.locale.json";
import ruErrors from './locales/ru.errors.locale.json';
import ru from "./locales/ru.locale.json";
import type { LocaleTypes } from "./types";

const resources: Record<string, { translation: LocaleTypes }> = {
  en: { translation: { ...en, ...enErrors} },
  ru: { translation: { ...ru, ...ruErrors} },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
