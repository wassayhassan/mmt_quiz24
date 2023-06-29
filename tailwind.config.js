const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        inter: ["Inter"],
        archivo: ["Archivo"],
      },
      colors: {
        body: "#f5f5f5",
        lightGray: "#D9D9D9",
        textGray: "#666666",
        subGray: "#8F8F8F",
      },
      backgroundImage: {
        btnGr: "linear-gradient(97.47deg, #000000 -56.62%, #8C8C8C 152.86%)",
        studyBg: "url('/public/card.png')",
      },
    },
  },
  plugins: [],
};
