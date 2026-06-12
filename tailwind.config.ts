import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        fuga: {
          orange: "var(--fuga-orange)",
          midnight: "var(--fuga-midnight)",
          slate: "var(--fuga-slate)",
          offwhite: "var(--fuga-offwhite)",
          green: "var(--fuga-green)",
          border: "var(--fuga-border)",
          borderStrong: "var(--fuga-border-strong)"
        }
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 1px 0 rgba(15,15,20,0.04)"
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
