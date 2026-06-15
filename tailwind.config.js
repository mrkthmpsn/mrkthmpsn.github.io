/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ggOrange: {
          50: "#fef8ee",
          100: "#fdf0d7",
          200: "#fadeae",
          300: "#f6c57b",
          400: "#f3ac5a",
          500: "#ee8721",
          600: "#df6c17",
          700: "#b95315",
          800: "#934119",
          900: "#773817",
          950: "#401b0a",
        },
        brandLightBlue: {
          50: "#f3f6fa",
          100: "#e8f0f7",
          200: "#d6e2ef",
          300: "#bccee5",
          400: "#a1b5d8",
          500: "#899dcb",
          600: "#7181ba",
          700: "#5f6ca3",
          800: "#4f5a84",
          900: "#444d6b",
          950: "#282d3e",
        },
        brandStraw: {
          50: "#f9f8f1",
          100: "#efead6",
          200: "#d6ca98",
          300: "#cbb97e",
          400: "#bfa660",
          500: "#b48e4c",
          600: "#9f7440",
          700: "#855938",
          800: "#6d4933",
          900: "#5b3d2c",
          950: "#332015",
        },
      },
    },
  },
  plugins: [],
};
