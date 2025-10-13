// tailwind.config.js
module.exports = {
  darkMode: "class", // enable dark mode toggle using a class
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], // adjust paths
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        playwrite: ["Playwrite", "cursive"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar-hide')
  ],
  safelist: [
    "prose",
    "prose-lg",
    "space-y-4",
    "whitespace-pre-line",
    "whitespace-pre-wrap",
  ],
};
