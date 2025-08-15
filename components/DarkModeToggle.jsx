"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle({ blogId }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`blogDarkMode-${blogId}`);
    if (stored === "true") setDarkMode(true);
  }, [blogId]);

  useEffect(() => {
    const blog = document.getElementById(`blog-${blogId}`);
    if (!blog) return;

    if (darkMode) blog.classList.add("dark");
    else blog.classList.remove("dark");

    localStorage.setItem(`blogDarkMode-${blogId}`, darkMode ? "true" : "false");
  }, [darkMode, blogId]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors duration-300 mt-150"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
