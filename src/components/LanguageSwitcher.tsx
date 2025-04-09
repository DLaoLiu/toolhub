import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "zh" ? "en" : "zh";
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-xl bg-white border text-sm text-gray-700 shadow hover:bg-blue-100 transition dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
            {i18n.language === "zh" ? "English" : "中文"}
        </button>
    );
}
