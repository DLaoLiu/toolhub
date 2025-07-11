import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Home() {
    const { t } = useTranslation();

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/base-converter" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-600">{t("baseConverter.title")}</h3>
                <p className="text-sm text-gray-500 mt-2">{t("baseConverter.desc")}</p>
            </Link>
            <Link to="/json-formatter" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-600">{t("jsonFormatter.title")}</h3>
                <p className="text-sm text-gray-500 mt-2">{t("jsonFormatter.desc")}</p>
            </Link>
            <Link to="/eth-unit-converter" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-600">{t("ethUnit.title")}</h3>
                <p className="text-sm text-gray-500 mt-2">{t("ethUnit.desc")}</p>
            </Link>
            <Link to="/timestamp-converter" className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-blue-600">{t("timestampConverter.title")}</h3>
                <p className="text-sm text-gray-500 mt-2">{t("timestampConverter.desc")}</p>
            </Link>
        </section>
    );
}
