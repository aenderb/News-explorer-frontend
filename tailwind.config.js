/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "Arial", "sans-serif"],
        "roboto-slab": ["Roboto Slab", "serif"],
        inter: ["Inter", "Arial", "sans-serif"],
      },
      colors: {
        "button-blue": "#2f71e5",
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};
