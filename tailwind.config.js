export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths based on your project
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
  plugins: [require("@tailwindcss/typography")],
};
  