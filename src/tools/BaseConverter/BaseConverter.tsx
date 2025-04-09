import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";

export default function BaseConverter() {
    const { t } = useTranslation();
    const [input, setInput] = useState("");
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(16);
    const [result, setResult] = useState("");
    const [steps, setSteps] = useState("");

    const handleConvert = () => {
        const trimmed = input.trim().toUpperCase();
        let decimal;
        let stepLogs = "";
        try {
            decimal = parseInt(trimmed, fromBase);
            if (isNaN(decimal)) throw new Error(t("baseConverter.error.inputInvalid"));

            if (fromBase !== 10) {
                const reversed = trimmed.split("").reverse();
                const details = reversed.map((char, idx) => {
                    const val = parseInt(char, fromBase);
                    if (isNaN(val)) throw new Error(t("baseConverter.error.containIllegalCharacter"));
                    return `${char}×${fromBase}^${idx} = ${val * Math.pow(fromBase, idx)}`;
                });
                stepLogs += `${t("baseConverter.firstStep")}：${fromBase} ➜ 10\n` + details.reverse().join("\n") + `\n\n➡️ ${t("baseConverter.decimalResult")}：${decimal}\n\n`;
            }

            if (toBase !== 10) {
                let q = decimal;
                const conversions = [];
                while (q > 0) {
                    const r = q % toBase;
                    conversions.push(`${q} ÷ ${toBase} = ${Math.floor(q / toBase)} ... ${t("baseConverter.surplus")} ${r}`);
                    q = Math.floor(q / toBase);
                }
                stepLogs += `${t("baseConverter.secondStep")}：10 ➜ ${toBase}\n` + conversions.join("\n") + "\n";
            }

            const final = decimal.toString(toBase).toUpperCase();
            setResult(`${trimmed}[${fromBase}] = ${final}[${toBase}]`);
            setSteps(stepLogs);
        } catch (err: any) {
            setResult(`❌ ${t("baseConverter.error.callWord")}：${err.message}`);
            setSteps("");
        }
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 text-black dark:text-white shadow p-6 transition-colors dark:border-gray-700">

            <h1 className="text-2xl font-bold text-center text-violet-600  dark:text-violet-400 mb-6">
                {t("baseConverter.title")}
            </h1>

            <label className="font-semibold">{t("baseConverter.input")}</label>
            <input
                className="w-full mt-1 mb-4 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                placeholder={t("baseConverter.inputPlaceholder")}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <label className="font-semibold">{t("baseConverter.from")}</label>
            <select
                className="w-full mt-1 mb-4 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                value={fromBase}
                onChange={(e) => setFromBase(Number(e.target.value))}
            >
                {[2, 8, 10, 16].map((b) => (
                    <option key={b} value={b}>
                        {b === 2
                            ? t("baseConverter.binary")
                            : b === 8
                                ? t("baseConverter.octal")
                                : b === 10
                                    ? t("baseConverter.decimal")
                                    : t("baseConverter.hexadecimal")}
                    </option>
                ))}
            </select>

            <label className="font-semibold">{t("baseConverter.to")}</label>
            <select
                className="w-full mt-1 mb-4 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                value={toBase}
                onChange={(e) => setToBase(Number(e.target.value))}
            >
                {[2, 8, 10, 16].map((b) => (
                    <option key={b} value={b}>
                        {b === 2
                            ? t("baseConverter.binary")
                            : b === 8
                                ? t("baseConverter.octal")
                                : b === 10
                                    ? t("baseConverter.decimal")
                                    : t("baseConverter.hexadecimal")}
                    </option>
                ))}
            </select>

            <button
                onClick={handleConvert}
                className="w-full mt-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all"
            >
                {t("baseConverter.convert")}
            </button>

            {/* <div className="mt-6 p-4 bg-gray-100 dark:bg-zinc-800 rounded-xl text-sm whitespace-pre-line">*/}
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-black dark:text-white" >
                <strong>✅ {t("baseConverter.result")}：</strong>
                <br />
                {result}
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-zinc-800 rounded-xl text-sm whitespace-pre-line">
                <strong>📘 {t("baseConverter.course")}：</strong>
                <br />
                {steps}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 bg-white dark:bg-zinc-800 border p-4 rounded-xl shadow-lg w-72 text-sm z-50"
            >
                <h3 className="font-bold text-violet-600 dark:text-violet-400 mb-2">
                    {t("baseConverter.conciseDecimalKnowledge")}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                    <li>{t("baseConverter.li.binary")}</li>
                    <li>{t("baseConverter.li.octal")}</li>
                    <li>{t("baseConverter.li.decimal")}</li>
                    <li>{t("baseConverter.li.hexadecimal")}</li>
                </ul>
            </motion.div>
        </div >
    );
}
