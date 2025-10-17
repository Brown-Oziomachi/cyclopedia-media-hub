"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function ViewMoreSearchPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isOpenRef = useRef(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpenRef.current && !isOpenRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Search size={25} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex h-screen z-[999] mt-10 lg:mt-30 items-center justify-center bg-black animate-fadeIn">
            <div
              ref={isOpenRef}
              className="relative w-11/12 max-w-lg p-8 rounded-xl shadow-2xl bg-black border border-gray-900 text-gray-100 animate-slideUp"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors duration-200 p-1"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight mb-2">
                  Search in <span className="text-purple-500">Cyclopedia</span>
                </h1>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Discover thousands of news and exclusive reports from our
                  archives.
                </p>
              </div>

              {/* Search Box */}
              <div className="mb-6">
                <div className="flex items-center bg-gray-900 border border-gray-700 hover:border-gray-600 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500/50">
                  <Search size={18} className="ml-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-3 bg-transparent text-gray-100 placeholder-gray-600 focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="w-full mt-3 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  Search
                </button>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-800"></div>

              {/* Quick Actions */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
                  Quick Links
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="/newsletter"
                    className="px-4 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-center font-medium text-sm transition-all duration-200"
                  >
                    Newsletter
                  </a>
                  <a
                    href="https://thecyclopedia.substack.com/subscribe"
                    className="px-4 py-2.5 rounded-lg bg-purple-900/20 hover:bg-purple-900/40 border border-purple-700/50 hover:border-purple-600 text-center font-medium text-sm text-purple-300 hover:text-purple-200 transition-all duration-200"
                  >
                    Support Us
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="text-center border-t border-gray-800 pt-4">
                <p className="text-xs text-gray-500">
                  © The Cyclopedia News — Truth. Insight. Independence.
                </p>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}
