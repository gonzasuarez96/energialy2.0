/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: "#d1d0dd",
          200: "#a3a2bb",
          300: "#757398",
          400: "#474576",
          500: "#191654",
          600: "#141243",
          700: "#0f0d32",
          800: "#0a0922",
          900: "#050411",
        },
        secondary: {
          100: "#d9f4ee",
          200: "#b4e8de",
          300: "#8eddcd",
          400: "#69d1bd",
          500: "#43c6ac",
          600: "#369e8a",
          700: "#287767",
          800: "#1b4f45",
          900: "#0d2822",
        },
      },
    },

    plugins: [],
  },
};
