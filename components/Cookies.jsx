"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieConsent = localStorage.getItem("cookieConsent");
      if (!cookieConsent) {
        setShowBanner(true);
      } else if (cookieConsent === "accepted") {
        loadGoogleAnalytics();
      }
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
      setShowCookieSettings(false);
      setTimeout(() => {
        loadGoogleAnalytics();
      }, 100);
    }
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cookieConsent", "declined");
      setShowBanner(false);
      setShowCookieSettings(false);
      window["ga-disable-G-TT01H9803V"] = true;
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-black">
              Respect of your privacy
            </h3>
          </div>

          {/* Main Text */}
          <div className="text-sm leading-relaxed text-black">
            <p>
              We use cookies and other trackers with the aim of providing,
              analyzing and improving your user experience, personalizing the
              display, displaying targeted ads according to your profile on both
              this site and our partners' sites, and allowing you to share our
              content over social media. In accordance with applicable
              legislation, certain audience measurement cookies are stored by
              default. You can change your cookie settings at any time by
              clicking on the "Manage my cookies" button. By clicking on the
              "Accept" button, you agree that we may store all cookies on your
              device. If you click on "Decline", only the technical cookies
              required for the site to function correctly will be used.
            </p>
            <p className="mt-3">
              For more information, especially concerning our list of partners,
              refer to the{" "}
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
              >
                Personal Data and Tracker Policy
              </Link>{" "}
              page.
            </p>
          </div>

          {/* Secondary Text */}
          <div className="text-sm text-gray-600">
            <p>
              If you decline, your information won't be tracked when you visit
              this website. A single cookie will be used in your browser to
              remember your preference not to be tracked.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowCookieSettings(!showCookieSettings)}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              Manage my cookies
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-2 border-2 border-gray-400 text-gray-700 rounded hover:border-gray-600 transition"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
            >
              Accept
            </button>
          </div>

          {/* Cookie Settings */}
          {showCookieSettings && (
            <div className="border-t border-gray-200 text-black pt-4 mt-4">
              <p className="text-sm font-semibold mb-3">Cookie Settings:</p>
              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="w-4 h-4"
                  />
                  <span>Essential Cookies (Required)</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Analytics & Performance Cookies</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>Advertising & Marketing Cookies</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
