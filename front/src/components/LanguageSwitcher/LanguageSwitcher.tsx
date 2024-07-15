import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.scss";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="languageSwitcher">
      <button onClick={() => changeLanguage("ru")}>Русский</button>
      <button onClick={() => changeLanguage("en")}>English</button>
    </div>
  );
}
