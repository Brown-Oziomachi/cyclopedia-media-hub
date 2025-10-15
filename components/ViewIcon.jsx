"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function ViewMoreSearchPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const isOpenRef = useRef(null)

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("")
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpenRef.current && !isOpenRef.current.contains(event.target)) {
        setIsOpen(false);
     }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mouseDown", handleClickOutside)
    }
 }, [isOpen])
  

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="transition-colors mt-1 duration-200 lg:hidden focus:ring-2 focus:ring-purple-400 mx-auto gap-2 rounded-full shadow-md flex items-center justify-center p-2  text-white "
      >
        <Search size={20} />
      </button>

      {isOpen && (
        <div
          ref={isOpenRef}
          className="fixed inset-0 z-50 flex items-center justify-center h-screen bg-black/90 bg-opacity-90"
        >
          <div className=" rounded-2xl shadow-2xl w-96 p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-1 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={22} />
            </button>
            <h1 className="my-2 text-center font-bold">
              THE CYCLOPEDIA | NEWS COMPANY
            </h1>
            <h5 className="text-center uppercase mb-5">
              Stay informed! Use our search to explore thousands of articles
              from The Cyclopedia News archives. Find breaking news, in-depth
              analysis, and stories that matter to you.
            </h5>

            <div className="flex  items-center border-2 border-gray-300 overflow-hidden shadow-sm focus-within:ring-2 ">
              <input
                type="text"
                placeholder="Type to search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full px-5 py-1 text-gray-200 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-black hover:bg-purple-700 px-4 py-2 text-white transition-colors"
              >
                <Search size={18} />
              </button>
            </div>
            <div className="flex gap-3 mt-10 items-center justify-around">
              <a className="bg-red-600 font-black px-5 py-2 rouded-lg" href="/newsletter">
                Join Us
              </a>
              <a
                className="bg-blue-600 font-black px-5 py-2 rouded-lg"
                href="https://thecyclopedia.substack.com/subscribe"
              >
                Support Us
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
