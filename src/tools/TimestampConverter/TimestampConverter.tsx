import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TimestampConverter() {
    const { t } = useTranslation();
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    const handleConvert = () => {
        const timestamp = parseInt(input);
        if (!isNaN(timestamp)) {
            const date = new Date(timestamp);
            setResult(date.toLocaleString());
            setError("");
        } else {
            const date = new Date(input);
            if (!isNaN(date.getTime())) {
                setResult(date.getTime().toString());
                setError("");
            } else {
                setError(t("timestampConverter.error.inputInvalid"));
                setResult("");
            }
        }
    };

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
            }, 3000);
        }
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 text-black dark:text-white shadow p-6 transition-colors relative">
            {copySuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
                >
                    {t("timestampConverter.success.copy")}
                </motion.div>
            )}

            <h1 className="text-2xl font-bold text-center text-violet-600 dark:text-violet-400 mb-6">
                {t("timestampConverter.title")}
            </h1>

            <label className="font-semibold">{t("timestampConverter.input")}</label>
            <input
                type="text"
                className="w-full mt-1 mb-4 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                placeholder={t("timestampConverter.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                onClick={handleConvert}
                className="w-full mt-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all"
            >
                {t("timestampConverter.convert")}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {result && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl text-sm whitespace-pre-line overflow-x-auto">
                    <strong>✅ {t("timestampConverter.result")}：</strong>
                    <pre className="text-sm text-gray-700 dark:text-gray-300">{result}</pre>
                    <button
                        onClick={handleCopy}
                        className="mt-4 py-2 px-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all"
                    >
                        {t("timestampConverter.copy")}
                    </button>
                </div>
            )}
        </div>
    );
}