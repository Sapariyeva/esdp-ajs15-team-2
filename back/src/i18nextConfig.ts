import i18n from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";

i18n
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: "./src/locales/{{lng}}/translation.json",
        },
        fallbackLng: "ru",
        preload: ["en", "ru"],
        detection: {
            order: ["header", "querystring", "cookie"],
            caches: ["cookie"],
        },
    });

export default i18n;