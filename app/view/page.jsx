"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

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
        className=" transition-colors duration-200 focus:ring-2 focus:ring-purple-400  mt-20 mx-auto px-6 py-2 rounded-full shadow-md flex items-center gap-2 mb-10"
      >
        <Search size={18} />
        View More
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-300 rounded-2xl shadow-2xl w-96 p-6 relative">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4  hover:text-gray-600 transition-colors"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <h2 className="text-xl text-black font-semibold mb-6 text-center">
              Search in{" "}
              <span className="text-purple-600 font-bold">Cyclopedia</span>
            </h2>

            {/* Search Input */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-4 py-2 text-gray-800 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white transition-colors"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
