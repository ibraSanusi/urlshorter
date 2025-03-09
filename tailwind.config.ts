import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        principal: "#386641",
        primary: "#A6FF00",
        secondary: "#F2E8CF",
        ternary: "#859c58",
      },
      borderColor: {
        principal: "#386641",
        primary: "#A6FF00",
        secondary: "#F2E8CF",
        ternary: "#859c58",
      },
      backgroundColor: {
        principal: "#386641",
        primary: "#A6FF00",
        secondary: "#F2E8CF",
        ternary: "#859c58",
      },
      keyframes: {
        pulse: {
          "50%": { opacity: ".5" },
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
