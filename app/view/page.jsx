"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ViewMoreSearchPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      {/* View More Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-600 hover:bg-blue-700 focus:ring-2 focus:ring-black text-white mt-20 mx-auto px-4 py-2 rounded-lg shadow-md items-center justify-center mb-10"
      >
        View More
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Title */}
            {/* <h2 className="text-lg font-semibold mb-4">Search in <span className="text-purple-600">Cyclopedia</span></h2> */}

            {/* Search Input */}
            <input
              type="text"
              placeholder="search anything in cyclopedia"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
