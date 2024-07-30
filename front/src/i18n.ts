import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "ru",
    lng: localStorage.getItem('i18nextLng') || 'ru', // Инициализация языка из localStorage
    backend: {
      loadPath: "src/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
