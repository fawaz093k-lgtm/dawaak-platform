/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#0d9488",
          hover: "#0f766e",
          light: "#2dd4bf",
        },
        navy: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
        },
      },
    },
  },
  plugins: [],
};
