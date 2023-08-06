import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div className="footer-container">
      <div className="footer-title">
        <h3>{t("madeBy")}</h3>
      </div>
      <div className="language-switch">
        <span>{t("availableOn")}</span>{" "}
        <span
          className={`languague-picker ${i18n.language === "vn" ? "selected" : ""}`}
          onClick={() => handleLanguageChange("vn")}
        >
          🇻🇳
        </span>
        <span
          className={`languague-picker ${i18n.language === "en" ? "selected" : ""}`}
          onClick={() => handleLanguageChange("en")}
        >
          🇺🇸
        </span>
      </div>
    </div>
  );
};

export default Footer;