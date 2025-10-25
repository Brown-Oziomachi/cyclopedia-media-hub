"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"; // icons (install lucide-react if not yet)

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  // Toggle handler
  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-800 dark:bg-gray-800 transition-colors -ml-2"
    >
      {theme === "light" ? (
        <Moon className="h-3 w-3 text-gray-200" />
      ) : (
        <Sun className="h-3 w-3 text-yellow-400" />
      )}
    </button>
  );
}
