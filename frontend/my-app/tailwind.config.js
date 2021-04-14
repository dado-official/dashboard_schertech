module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
   darkMode: false, // or 'media' or 'class'
   theme: {
     extend: {
      colors: {
        primary: "#1B1B1B",
        background: "#161616",
        hover:"#343434"
      },
      spacing: {
        1.875: "1.875rem",
        13.313: "13.313rem",
        0.938: "0.938rem",
        0.688: '0.688rem',
        1.188: "1.188rem",
        1.688: "1.688rem",
        2.563: "2.563rem",
        14.625: "14.625rem"
      },
      fontFamily: {
        monserrat: ['Monserrat', 'sans-serif'],
      },
      borderRadius: {
        0.938: "0.938rem"
      }
    },
    
   },
   variants: {
     extend: {},
   },
   plugins: [],
 }