"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function StatusModal({ trigger }) {
  const [isOpen, setIsOpen] = useState(false);

  // Example statuses (later you can fetch from Firestore or API)
  const statuses = [
    { type: "video", src: "/banporn.mp4", text: "Ban pornography talk" },
    { type: "video", src: "/war.mp4", text: "Israel and Gaza war" },
    { type: "video", src: "/strike.mp4", text: "Israel strike on gaza" },
  ];

  return (
    <>
      {/* ✅ Trigger (Logo or Button passed from parent) */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {/* ✅ Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative rounded-2xl shadow-lg max-w-3xl w-full p-4 mt-80">
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 rounded-full p-1 text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-lg font-bold mb-3 text-white">
             <span className="text-purple-600">The Cyclopedia</span> Status
            </h2>

            {/* Horizontal scrollable videos */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {statuses.map((status, i) => (
                <div key={i} className="flex-shrink-0 w-[250px] relative">
                  {/* ✅ Watermark text above each video */}
                  <div className="absolute top-2 left-2 text-white text-sm font-bold opacity-100 pointer-events-none select-none">
                    {status.text}
                  </div>

                  {status.type === "video" && (
                    <video
                      src={status.src}
                      controls
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
