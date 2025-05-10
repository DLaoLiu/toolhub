import './App.css'

import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import BaseConverter from "./tools/BaseConverter/BaseConverter";
import EthUnitConverter from "./tools/EthUnitConverter/EthUnitConverter";
import JsonFormatter from "./tools/JsonFormatter/JsonFormatter";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 transition-colors">
      <header className="flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-gray-700 dark:text-gray-100">
          {t("title")}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base-converter" element={<BaseConverter />} />
        <Route path="/json-formatter" element={<JsonFormatter />} />
        <Route path="/eth-unit-converter" element={<EthUnitConverter />} />
      </Routes>
    </div>
  );
}
