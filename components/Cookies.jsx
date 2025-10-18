"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (!cookieConsent) {
        setShowBanner(true);
      } else if (cookieConsent === "accepted") {
        loadGoogleAnalytics();
      }

      // ✅ Move this inside useEffect to avoid SSR error
      window["ga-disable-G-TT01H9803V"] = true;
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-TT01H9803V");

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-TT01H9803V";
    document.head.appendChild(script);
  };

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "accepted");
      setShowBanner(false);
      setTimeout(() => {
        loadGoogleAnalytics();
      }, 100);
    }
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "declined");
      setShowBanner(false);
      window["ga-disable-G-YOUR_MEASUREMENT_ID"] = true;
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-white">
            We use cookies to enhance your experience and analyze site usage.
            <Link
              href="/privacy-policy"
              className="ml-2 underline hover:text-blue-400"
            >
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 border border-gray-600 text-white rounded hover:bg-gray-800 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
