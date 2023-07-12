import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')


export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;