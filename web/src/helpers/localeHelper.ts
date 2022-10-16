// i10n
import intl from "react-intl-universal";
// common locale data
import "intl/locale-data/jsonp/en";
import "intl/locale-data/jsonp/tr";
// app locale data (translated strings)
import msgEN from "./../locales/en.json";
import msgTR from "./../locales/tr.json";

export const INTL_LOCALES = {
  en: msgEN,
  tr: msgTR,
};

export type LanguageCodesType = "en" | "tr";
export const LANGUAGES: LanguageCodesType[] = ["en", "tr"];
export const DEFAULT_UI_LOCALE: LanguageCodesType = "en";

// Extended list
export type UILocaleType = {
  code: LanguageCodesType;
  name: string;
  nativeName: string;
  enabled: number;
};

// app locale data (translated strings)
export const UI_LANGUAGES: UILocaleType[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    enabled: 1,
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    enabled: 1,
  },
];

// Some may be manually disabled, so only get enabled ones
export const getEnabledUILanguages = () => {
  return UI_LANGUAGES.filter((rec) => rec.enabled === 1);
};

//================================
// i18n by react-intl-universal
//================================

// Initialize - returns the selected default language or browser language
export const uiLocaleInit = (reqLocale?: LanguageCodesType) => {
  let resLang: string = DEFAULT_UI_LOCALE; // assume default
  if (!reqLocale) {
    // No specific locale requested, decide from browser and/or default
    // try user’s browser language
    const browserLang: string = navigator.language.split(/[-_]/)[0];
    // check if available, if not choose default
    resLang = browserLang in LANGUAGES ? browserLang : DEFAULT_UI_LOCALE;
  } else {
    //
    resLang = reqLocale;
  }

  // returns a promise
  return intl.init({
    currentLocale: resLang,
    fallbackLocale: DEFAULT_UI_LOCALE,
    // locales: UI_LANGUAGES,
    locales: INTL_LOCALES,
  });
};
