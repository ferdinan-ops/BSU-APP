/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1170px",
      },
    },
    extend: {
      // boxShadow: {
      //   button: "0px 10px 25px rgba(252, 185, 0, 0.3);",
      // },
      colors: {
        primary: "#FCB900",
        font: "#2D3436",
        gray: "#667085",
        auth: "#C2C9D1",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
