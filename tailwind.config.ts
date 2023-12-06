import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: "#5762e1",
        lightPurple: "#9c6ce8",
        lightGray: "#f6f8fa",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
