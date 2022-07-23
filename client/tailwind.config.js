/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        350: "350px",
      },
      height: {
        line: "1px",
      },
      fontSize: {
        tworem: "2rem",
      },
      borderWidth: {
        1: "1px",
      },
      backgroundColor: {
        primary: "#003580",
      },
      borderColor: {
        primary: "#003580",
      },
      colors: {
        primary: "#003580",
      },
    },
  },
  plugins: [],
};
