/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F5F2EE",
          dark: "#EEEBE6",
          darker: "#E8E4DF",
        },
        ink: "#1A1A1A",
        accent: {
          DEFAULT: "#E8672A",
          dark: "#D45A20",
        },
        muted: "#6a6a6a", // Darkened from #777777 for WCAG AA contrast (4.5:1)
        "border-cream": "#DEDAD5",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
