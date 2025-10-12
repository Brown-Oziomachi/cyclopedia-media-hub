"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function StatusModal({ trigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const statusRef = useRef(null);


  const statuses = [
    { type: "video", src: "https://www.youtube.com/embed/lhCH0Z5SSsw", text: "Latest Breaking News" },
    { type: "video", src: "https://www.youtube.com/embed/WptREEgMqI0", text: "Israel and Gaza war" },
    { type: "video", src: "https://www.youtube.com/embed/2-6n7_GxkwA", text: "Israel strike on gaza" },
    { type: "image", src: "/hid.png", text: "Welcome to The Cyclopedia" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && statusRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])
  return (
    <>
      {/* ✅ Trigger (Logo or Button passed from parent) */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {/* ✅ Modal */}
      {isOpen && (
        <div
          ref={statusRef}
          className="fixed inset-0 bg-black/100 flex items-center justify-center z-[70]">
          <div className="relative rounded-2xl shadow-lg max-w-4xl w-full p-4 mt-80">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 rounded-full p-1 text-white"
            >
              <X size={34} />
            </button>

            <h2 className="text-lg font-bold mb-1 text-white text-center">
              <span className="text-purple-600 underline cursor-pointer">The Cyclopedia</span> Status
            </h2>
            <h3 className="text-xs text-center mb-3">Always check our status for latest videos</h3>
            {/* Horizontal scrollable statuses */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide bg-black">
              {statuses.map((status, i) => (
                <div key={i} className="flex-shrink-0 w-[370px] relative">
                  {/* ✅ Watermark text above each item */}
                  <div className="absolute top-2 left-4 text-white font-bold opacity-100 pointer-events-none select-none">
                    {status.text}
                  </div>

                  {status.type === "video" && (
                    <iframe
                      src={status.src}
                      title={`status-${i}`}
                      className="w-full h-64 rounded-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}

                  {status.type === "image" && (
                    <img
                      src={status.src}
                      alt={status.text}
                      className="w-full h-64 rounded-lg object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
