/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
  ],
  daisyui: {
    themes: ["autumn"]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
