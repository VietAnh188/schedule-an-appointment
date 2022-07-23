/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        line: "1px",
      },
      width:{
        "350":"350px"
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
