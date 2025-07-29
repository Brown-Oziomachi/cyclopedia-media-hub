"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScroll(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to get color based on scroll
  const getColor = (value) => {
    if (value < 30) return "#ef4444"; // Red-500
    if (value < 70) return "#facc15"; // Yellow-400
    return "#22c55e"; // Green-500
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 z-50"
      initial={{ width: 0 }}
      animate={{ width: `${scroll}%`, backgroundColor: getColor(scroll) }}
      transition={{ ease: "easeOut", duration: 0.2 }}
    />
  );
}