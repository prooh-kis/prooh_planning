/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      '2xs': '0.5rem',
      xs: '0.6rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'], // Replace 'Roboto' with your custom font
      },
      colors: {
        primaryText: '#0E212E',
        secondaryText: '#4A606E90',
        primaryButton: '#00A0FA',
        secondaryButton: '#D7D7D7',
        statusBlue: '#4DAAFG',
        brand: "#52A2FF",
        competitor: "#20AA70",
        brand_competitor: "#FF5252",
        rainbow1: "#8F00FF",
        rainbow2: "#4B0082",
        rainbow3: "#0000FF",
        rainbow4: "#008080",
        rainbow5: "#00FF00",
        rainbow6: "#FFFF00",
        rainbow7: "#FFBF00",
        rainbow8: "#FFA500",
        rainbow9: "#FF0000",
        rainbow10: "#DC143C"
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};