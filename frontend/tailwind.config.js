//export default {
//content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//theme: { extend: { colors: { primary: "#4F8EF7", accent: "#2DD4A7", dark: "#0B0F1A", surface: "#131929", border: "#1C2540" } } },
//plugins: [],
//};

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        "base-deep": "var(--color-base-deep)",
        surface: "var(--color-surface)",
        "surface-hover": "var(--color-surface-hover)",
        border: "var(--color-border)",
        cream: "var(--color-cream)",
        "rose-muted": "var(--color-rose-muted)",
        gold: "#D4AF6A",
        "gold-dark": "#C9A15A",
        "gold-light": "#E4C88A",
        success: "#4ADE80",
        danger: "#E05252",
        warn: "#E0A952",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeInUp: { "0%": { opacity: 0, transform: "translateY(12px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        blink: { "0%, 100%": { opacity: 1 }, "50%": { opacity: 0 } },
      },
    },
  },
  plugins: [],
};