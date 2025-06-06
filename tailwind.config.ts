import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'poppins': ['var(--font-poppins)', 'monospace'],
        'pp-neue-machina': ['"PP Neue Machina"', 'sans-serif'],
        'space-mono': ['var(--font-space-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
