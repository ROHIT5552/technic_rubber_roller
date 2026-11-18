import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#090A0C",
          900: "#0D0F13",
          800: "#12151B",
          700: "#181C24",
          600: "#222833",
        },
        steel: {
          100: "#F4F6F9",
          200: "#E4E8EE",
          300: "#C5CCD6",
          400: "#949DAA",
          500: "#67707F",
          600: "#3E4552",
          700: "#272C36",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          bright: "rgb(var(--accent-bright-rgb) / <alpha-value>)",
          dim: "rgb(var(--accent-dim-rgb) / <alpha-value>)",
        },
        silver: {
          100: "#F8FAFC",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "industrial-grid":
          "linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-64": "64px 64px",
      },
    },
  },
  plugins: [],
};

export default config;
