import "i18next";
import type { LocaleTypes } from "@/i18n/types";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: LocaleTypes;
    };
  }
}
