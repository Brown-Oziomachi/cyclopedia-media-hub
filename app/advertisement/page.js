"use client";

import { useState, useEffect } from "react";
import { db1 } from "@/lib/firebaseConfig";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function AdBanner() {
    const [ads, setAds] = useState([]);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    // Show banner after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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

    // Rotate ads every 12 seconds
    useEffect(() => {
        if (ads.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        }, 12000);

        return () => clearInterval(interval);
    }, [ads.length]);

    const handleDotClick = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentAdIndex(index);
    };

    // Create slug for news articles
    const createSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const createFullSlug = (title, id) => {
        return `${createSlug(title)}--${id}`;
    };

    // Don't render anything if not visible yet
    if (!isVisible) {
        return null;
    }

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="w-full bg-gray-50 border-y border-gray-200 animate-pulse">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-56 md:h-64 bg-gray-300"></div>
                        <div className="flex-1 p-6 md:p-8 space-y-3">
                            <div className="h-8 bg-gray-300 rounded w-full"></div>
                            <div className="h-6 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!ads.length) {
        return null;
    }

    const currentAd = ads[currentAdIndex];

    return (
        <div className="w-full bg-white border-y border-gray-200 my-8">
            <div className="max-w-7xl mx-auto">
                {/* Advertisement Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                        Advertisement
                    </span>
                    <Link href="/">
                        <span className="text-xs text-gray-500">The Cyclopedia</span>
                    </Link>
                </div>

                {/* Ad Content - Horizontal Layout */}
                <a
                    href={`/news/${createFullSlug(currentAd.title, currentAd.id)}`}
                    className="flex flex-col md:flex-row group cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                >
                    {/* Ad Image - Left Side */}
                    <div className="relative w-full md:w-2/5 lg:w-1/3 h-56 md:h-auto md:min-h-[240px] overflow-hidden flex-shrink-0">
                        <img
                            src={currentAd.imageUrl || "https://via.placeholder.com/600x400"}
                            alt={currentAd.title || "Advertisement"}
                            className="w-full h-full object-cover"
                        />
                        {/* Source Badge on Image */}
                        {currentAd.source && (
                            <div className="absolute bottom-3 left-3 bg-black text-white text-sm font-bold px-3 py-1.5 uppercase pointer-events-none">
                                {currentAd.source}
                            </div>
                        )}
                    </div>

                    {/* Ad Text - Right Side */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                            {currentAd.title || "Advertisement Title"}
                        </h3>
                        {currentAd.subtitle && (
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {currentAd.subtitle}
                            </p>
                        )}
                    </div>
                </a>

                {/* Ad Navigation Dots */}
                {ads.length > 1 && (
                    <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-200">
                        {ads.slice(0, 10).map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => handleDotClick(e, index)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentAdIndex
                                    ? "w-8 bg-blue-600"
                                    : "w-2 bg-gray-300 hover:bg-gray-400"
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