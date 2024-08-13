import { useTranslation } from "react-i18next";
import { Select } from "@/components/UI/Select/Select";
import "./LanguageSwitcher.scss";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageOptions = [
    { value: "ru", label: "Рус" },
    { value: "en", label: "Eng" }
  ];

  return (
    <div className="languageSwitcher">
      <Select 
        options={languageOptions} 
        defaultValue={i18n.language} 
        onChange={changeLanguage} 
        type="default" 
        style={{ width: '45px' }} 
      />
    </div>
  );
}
