module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: "#1B1B1B",
        background: "#161616"
      }
    },
    spacing: {
      1.875: "1.875rem",
      13.313: "13.313rem"
    }
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }