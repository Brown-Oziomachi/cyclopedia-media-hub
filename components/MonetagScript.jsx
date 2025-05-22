"use client";

import { useEffect, useRef } from "react";

export default function MonetagScript() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://al5sm.com/tag.min.js";
    script.setAttribute("data-zone", "9366256");
    script.async = true;
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{
        height: "0px", // Prevent UI impact
        pointerEvents: "none", // Prevent clicking
        position: "absolute",
        bottom: 0,
        zIndex: -1, // Keep it behind everything
      }}
    />
  );
}
