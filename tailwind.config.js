/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f1017",
        accent: {
          DEFAULT: "#e14817",
          hover: "#cb4419",
        },
        secondary: {
          DEFAULT: "#1b1c23",
          hover: "#1f212d",
        },
        tertiary: {
          DEFAULT: "#26272e",
          hover: "#24252c",
        },
        grey: "#737373",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    backgroundImage: {
      heroBg1: "url('/src/assets/hero/microphone.jpg')",
      heroBg2: "url('/src/assets/hero/meeting.jpg')",
      pattern: "url('/assets/images/patern-bg.png')",
    },
    fontFamily: {
      generalsans: ["General Sans", "sans-serif"],
      archivo: ["Archivo", "sans-serif"],
      youth: ["Youth", "serif"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
