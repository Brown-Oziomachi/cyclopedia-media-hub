"use client";

import { useState, useEffect } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

export default function AdBanner() {
    const [ads, setAds] = useState([]);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Fetch ads from Firebase
    useEffect(() => {
        const q = query(
            collection(db1, "blogs"),
            orderBy("createdAt", "desc"),
            limit(60)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const adsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAds(adsData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Handle scroll behavior - show/hide based on scroll
    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide when scrolling (either direction)
            setIsVisible(false);
            setLastScrollY(currentScrollY);

            // Show ad after user stops scrolling for 1.5 seconds
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Rotate ads every 12 seconds
    useEffect(() => {
        if (ads.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 12000);

        return () => clearInterval(interval);
    }, [ads.length]);

    if (isLoading || !ads.length) {
        return null;
    }

    const currentAd = ads[currentAdIndex];

    return (
        <div
            className={`fixed top-4 right-4 z-50 w-80 transition-all duration-500 ease-in-out ${isVisible ? "translate-x-0 opacity-100" : "translate-x-[calc(100%+2rem)] opacity-0"
                }`}
        >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
                {/* Close Button */}
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-10 right-3 z-10 bg-black/70 hover:bg-black text-white rounded-full p-1.5 transition-colors"
                    aria-label="Close advertisement"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Advertisement Label */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        Advertisement
                    </span>
                    <span className="text-[10px] text-gray-400">The Cyclopedia</span>
                </div>

                {/* Ad Content - Vertical Layout */}
                <a
                    href={currentAd.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                >
                    {/* Ad Image */}
                    <div className="relative w-full h-48 overflow-hidden">
                        <img
                            src={currentAd.imageUrl || "https://via.placeholder.com/400x300"}
                            alt={currentAd.title || "Advertisement"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {currentAd.source && (
                            <div className="absolute bottom-2 left-2 bg-black/90 text-white text-xs font-bold px-3 py-1 uppercase">
                                {currentAd.source}
                            </div>
                        )}
                    </div>

                    {/* Ad Text */}
                    <div className="p-4 space-y-2">
                        <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {currentAd.title || "Advertisement Title"}
                        </h3>
                        {currentAd.description && (
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {currentAd.description}
                            </p>
                        )}
                    </div>
                </a>

                {/* Ad Navigation Dots */}
                {ads.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 px-4 pb-3">
                        {ads.slice(0, 10).map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentAdIndex(index);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentAdIndex
                                        ? "w-6 bg-blue-600"
                                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                                    }`}
                                aria-label={`View ad ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}