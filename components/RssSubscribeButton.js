"use client";

import { Rss, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RssSubscribeButton({ variant = "default" }) {
    const [showPopup, setShowPopup] = useState(false);
    const rssUrl = "https://www.thecyclopedia.com.ng/feed.xml";

    // Close popup on Esc key
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && setShowPopup(false);
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Shared popup content showing only subscription readers
    const PopupContent = ({ center = false, positionClass = "" }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-5 w-80 sm:w-96 ${center
                    ? "left-4 right-4 -translate-x-1/1 top-10 sm:top-32"
                    : positionClass
                }`}
            role="dialog"
            aria-modal="true"
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 text-lg">Subscribe to our RSS Feed</h3>
                <button
                    onClick={() => setShowPopup(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
                >
                    <X size={20} />
                </button>
            </div>

            <p className="text-sm text-gray-600 mb-4 text-center">
                Quickly subscribe using your favorite RSS reader:
            </p>

            <div className="flex flex-wrap justify-center gap-2">
                {[
                    { name: "Feedly", url: `https://feedly.com/i/subscription/feed/${encodeURIComponent(rssUrl)}`, bg: "bg-green-50", text: "text-green-700" },
                    { name: "Inoreader", url: `https://www.inoreader.com/?add_feed=${encodeURIComponent(rssUrl)}`, bg: "bg-blue-50", text: "text-blue-700" },
                    { name: "The Old Reader", url: `https://theoldreader.com/i/subscription?url=${encodeURIComponent(rssUrl)}`, bg: "bg-purple-50", text: "text-purple-700" },
                ].map((reader) => (
                    <a
                        key={reader.name}
                        href={reader.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs px-3 py-1.5 ${reader.bg} ${reader.text} rounded-md hover:bg-opacity-80 transition-colors font-medium`}
                    >
                        {reader.name}
                    </a>
                ))}
            </div>
        </motion.div>
    );

    // Determine position for footer/link variants
    const getPositionClass = () => {
        if (variant === "footer") return "bottom-full left-0 mb-2";
        if (variant === "link") return "top-full left-0 mt-2";
        return ""; // default/icon will be centered
    };

    const isCentered = variant === "default" || variant === "icon";

    return (
        <div className="relative inline-block">
            {variant === "default" && (
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md"
                    aria-label="Subscribe via RSS"
                >
                    <Rss size={20} />
                    Subscribe via RSS
                </button>
            )}

            {variant === "icon" && (
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    title="Subscribe via RSS"
                    aria-label="Subscribe via RSS"
                >
                    <Rss size={20} className="text-orange-500" />
                </button>
            )}

            {variant === "footer" && (
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors relative"
                >
                    <Rss size={18} />
                    RSS Feed
                </button>
            )}

            {variant === "link" && (
                <button
                    onClick={() => setShowPopup(!showPopup)}
                    className="inline-flex items-center gap-1 text-orange-500 hover:text-orange-600 font-medium relative"
                >
                    <Rss size={16} />
                    Subscribe
                </button>
            )}

            <AnimatePresence>
                {showPopup && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black bg-opacity-25"
                            onClick={() => setShowPopup(false)}
                        />
                        <PopupContent center={isCentered} positionClass={getPositionClass()} />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
