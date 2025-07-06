import type { Config } from "tailwindcss";

const config = {
  content:[
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/components/layout/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ]
  ,

  theme: {
    extend: {
      colors: {
        brand: "#3b82f6",
        "brand-dark": "#1e40af",
      },
    },
  },

  plugins: [],
} satisfies Config;

export default config;
