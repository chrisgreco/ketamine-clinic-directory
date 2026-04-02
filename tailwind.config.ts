import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A0F1E",
        teal: "#00C9C8",
        "soft-white": "#EDF2F7",
        card: "#111827",
        lavender: "#A78BFA",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
