import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^text-/,
    },
  ],
  theme: {
    container: {
      center: true,
      padding: "0", // Supprime les marges internes
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
      },
      fontFamily: {
      montserrat: ['Aboreto', 'cursive'],
    },
    },
  },
  plugins: [],
} satisfies Config;
