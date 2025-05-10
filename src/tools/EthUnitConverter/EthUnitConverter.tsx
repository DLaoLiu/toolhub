import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const ethUnits = [
    "Wei", "Kwei", "Mwei", "Gwei", "Szabo", "Finney",
    "Ether", "Kether", "Mether", "Gether", "Tether"
];

const unitFactors: Record<string, number> = {
    Wei: 1,
    Kwei: 1e3,
    Mwei: 1e6,
    Gwei: 1e9,
    Szabo: 1e12,
    Finney: 1e15,
    Ether: 1e18,
    Kether: 1e21,
    Mether: 1e24,
    Gether: 1e27,
    Tether: 1e30,
};

export default function ethUnit() {
    const { t } = useTranslation();
    const [values, setValues] = useState<Record<string, string>>({ Ether: "1" });
    const [mode, setMode] = useState<"auto" | "select">("auto");
    const [fromUnit, setFromUnit] = useState("Ether");
    const [toUnit, setToUnit] = useState("Wei");
    const [selectValue, setSelectValue] = useState("");

    // 处理输入值变化的函数
    const handleChange = (unit: string, value: string) => {
        if (!/^-?\d*\.?\d*$/.test(value)) return;

        // 计算基础值（转换为Wei）
        const baseValue = parseFloat(value || "0") * unitFactors[unit];

        // 计算所有单位的值
        const newValues: Record<string, string> = {};
        ethUnits.forEach((u) => {
            newValues[u] = (baseValue / unitFactors[u]).toString();
        });

        // 更新状态
        setValues(newValues);
    };

    // 在组件首次加载时计算所有单位的值
    useEffect(() => {
        // 使用默认值"1 Ether"触发计算
        handleChange("Ether", "1");
    }, []);

    const handleSelectConvert = () => {
        if (!/^-?\d*\.?\d*$/.test(selectValue)) return;
        const baseValue = parseFloat(selectValue || "0") * unitFactors[fromUnit];
        const result = (baseValue / unitFactors[toUnit]).toString();
        setValues({ [fromUnit]: selectValue, [toUnit]: result });
    };

    const toggleMode = () => {
        setMode(mode === "auto" ? "select" : "auto");
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-900 text-black dark:text-white shadow p-6 transition-colors dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                    {t("ethUnit.title")}
                </h1>
                <button
                    className="text-sm text-violet-600 dark:text-violet-400 border px-3 py-1 rounded-xl"
                    onClick={toggleMode}
                >
                    {mode === "auto"
                        ? t("ethUnit.switchToSelect")
                        : t("ethUnit.switchToAuto")}
                </button>
            </div>

            {mode === "auto" ? (
                <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {t("ethUnit.autoHint")}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ethUnits.map((unit) => (
                            <div key={unit}>
                                <label className="font-semibold">{unit}</label>
                                <input
                                    className="w-full mt-1 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                                    value={values[unit] || ""}
                                    onChange={(e) => handleChange(unit, e.target.value)}
                                    placeholder={`${t("ethUnit.input")}${unit}`}
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="font-semibold">{t("ethUnit.from")}</label>
                            <select
                                className="w-full mt-1 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                            >
                                {ethUnits.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold">{t("ethUnit.to", "到单位")}</label>
                            <select
                                className="w-full mt-1 p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                            >
                                {ethUnits.map((u) => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <input
                            className="w-full p-2 rounded-xl border dark:bg-zinc-800 dark:text-white"
                            value={selectValue}
                            onChange={(e) => setSelectValue(e.target.value)}
                            placeholder={t("ethUnit.input", "请输入数值")}
                        />
                        <button
                            className="px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
                            onClick={handleSelectConvert}
                        >
                            {t("ethUnit.convert")}
                        </button>
                    </div>
                    {values[toUnit] && (
                        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-4 rounded-xl text-sm">
                            ✅ {selectValue} {fromUnit} = {values[toUnit]} {toUnit}
                        </div>
                    )}
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-6 right-6 bg-white dark:bg-zinc-800 border p-4 rounded-xl shadow-lg w-80 text-sm z-50"
            >
                <h3 className="font-bold text-violet-600 dark:text-violet-400 mb-2">
                    {t("ethUnit.knowledgeCard", "ETH 单位知识卡")}
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-200">
                    <li>1 Kwei = 1,000 Wei</li>
                    <li>1 Mwei = 1,000 Kwei</li>
                    <li>1 Gwei = 1,000 Mwei</li>
                    <li>1 Szabo = 1,000 Gwei</li>
                    <li>1 Finney = 1,000 Szabo</li>
                    <li>1 Ether = 1,000 Finney</li>
                    <li>1 Kether = 1,000 Ether</li>
                    <li>1 Mether = 1,000 Kether</li>
                    <li>1 Gether = 1,000 Mether</li>
                    <li>1 Tether = 1,000 Gether</li>
                </ul>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    ✅ 每个单位相对上一级单位乘以 <code>10³</code>，即每级进制都是 1000 倍。
                </p>
            </motion.div>
        </div>
    );
}