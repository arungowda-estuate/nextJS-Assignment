import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./language/locales/en.json";
import frTranslation from "./language/locales/fr.json";
import jaTranslation from "./language/locales/ja.json";

// Language resources
const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  ja: { translation: jaTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    fallbackLng: "en", // Fallback if language is not available
    interpolation: { escapeValue: false },
  });

export default i18n;
