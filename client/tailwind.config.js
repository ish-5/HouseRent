/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#05070f",
          900: "#0a0e1a",
          800: "#111726",
          700: "#1a2236",
        },
        accent: {
          500: "#f59e0b",
          600: "#d97706",
          400: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(245,158,11,0.35)",
      },
    },
  },
  plugins: [],
};
