import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function JsonFormatter() {
    const { t } = useTranslation();
    const [input, setInput] = useState("");
    const [formattedJson, setFormattedJson] = useState("");
    const [error, setError] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);

    const handleFormat = () => {
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);  // 格式化 JSON 数据
            setFormattedJson(formatted);
            setError("");
        } catch (err) {
            setError(t("jsonFormatter.error.invalidJson"));
            setFormattedJson("");
        }
    };

    const handleCopy = () => {
        if (formattedJson) {
            navigator.clipboard.writeText(formattedJson);
            setCopySuccess(true);

            // 3秒后自动隐藏提示
            setTimeout(() => {
                setCopySuccess(false);
            }, 3000);
        }
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 text-black dark:text-white shadow p-6 transition-colors dark:border-gray-700">
            <h1 className="text-2xl font-bold text-center text-violet-600 dark:text-violet-400 mb-6">
                {t("jsonFormatter.title")}
            </h1>

            <label className="font-semibold">{t("jsonFormatter.input")}</label>
            <textarea
                className="w-full mt-1 mb-4 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                rows={6}
                placeholder={t("jsonFormatter.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                onClick={handleFormat}
                className="w-full mt-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all"
            >
                {t("jsonFormatter.format")}
            </button>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {formattedJson && (
                <div className="mt-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl text-sm whitespace-pre-line overflow-x-auto relative">
                    <strong>✅ {t("jsonFormatter.result")}：</strong>
                    <pre className="text-sm text-gray-700 dark:text-gray-300">{formattedJson}</pre>
                    <div className="flex items-center mt-4">
                        <button
                            onClick={handleCopy}
                            className="py-2 px-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all"
                        >
                            {t("jsonFormatter.copy")}
                        </button>

                        {copySuccess && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="ml-4 text-green-500 font-medium"
                            >
                                ✓ {t("jsonFormatter.success.copy")}
                            </motion.div>
                        )}
                    </div>
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 bg-white dark:bg-zinc-800 border p-4 rounded-xl shadow-lg w-72 text-sm z-50"
            >
                <h3 className="font-bold text-violet-600 dark:text-violet-400 mb-2">
                    {t("jsonFormatter.conciseJsonKnowledge")}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                    <li>{t("jsonFormatter.li.validJson")}</li>
                    <li>{t("jsonFormatter.li.usage")}</li>
                </ul>
            </motion.div>
        </div>
    );
}