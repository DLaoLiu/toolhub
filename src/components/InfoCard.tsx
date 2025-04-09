import { useState } from "react";

export function InfoCard({ content }: { content: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="text-sm underline text-blue-600 hover:text-blue-800"
            >
                进制知识？
            </button>

            {open && (
                <div className="absolute z-10 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 shadow-xl p-4 rounded-xl w-72 mt-2 right-0 animate-fade-in">
                    <p>{content}</p>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-xs text-blue-500 mt-2 hover:underline"
                    >
                        关闭
                    </button>
                </div>
            )}
        </div>
    );
}
