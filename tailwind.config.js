/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: "#025FEB",
      grey: { main: "#E4EDF2", light: "#F6F7F7" },
      white: "#FFF",
      text: {
        main: "#4B5C68",
        primary: "#182C62",
      },
    },
    fontSize: {
      caption: "12px",
      body2: "14px",
      body1: "16px",
      h1: "24px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
