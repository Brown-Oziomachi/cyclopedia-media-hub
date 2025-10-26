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
    <div className="w-full">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Search size={25} />
      </button>

      {isOpen && (
        <div
          ref={isOpenRef}
          className="fixed inset-0 right-0 h-screen z-[999] flex flex-col items-center justify-center bg-black animate-fadeIn px-6 py-0"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-80 left-0 text-white hover:text-red-500 transition-colors duration-200 p-2 bg-gray-900/50 rounded-full"
          >
            <X size={32} />
          </button>

          {/* Search Text */}
          <div className="text-center mb-8">
            <h2 className="text-white text-3xl lg:text-4xl font-bold">
              Search Here
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-6 py-5 bg-transparent border-b-2 border-white text-white text-xl placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              autoFocus
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-purple-500 transition-colors"
            >
              <Search size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
