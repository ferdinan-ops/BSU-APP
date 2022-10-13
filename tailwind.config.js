/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
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
      boxShadow: {
        profile: "0px 20px 30px rgba(45, 52, 54, 0.2)",
      },
      colors: {
        primary: "#FCB900",
        font: "#2D3436",
        gray: "#667085",
        auth: "#C2C9D1",
        "gray-2": "#ADADAD"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
