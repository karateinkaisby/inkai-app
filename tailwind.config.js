/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./core/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inkai: {
          red: "#D62828",
          gold: "#C6A667",
          yellow: "#F7D536",
        },
        jarvis: {
          cyan: "#00E0FF",
          deep: "#1C9EDB",
          dark: "#0A0A0A",
          panel: "#111214",
          soft: "#1A1C1F",
        },
      },
      boxShadow: {
        "jarvis-glow": "0 0 12px rgba(0, 224, 255, 0.6)",
        "inkai-glow": "0 0 12px rgba(214, 40, 40, 0.6)",
      },
    },
  },
  plugins: [],
};
