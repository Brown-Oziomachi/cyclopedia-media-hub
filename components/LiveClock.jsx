"use client";
import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`); // ✅ fixed
    };

    updateClock(); 
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div className="text-2xl font-bold text-center max-lg:hidden">
      {time}
    </div>
  );
}
