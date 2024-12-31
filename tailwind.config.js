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
        violet: "#8B5CF6",
        indigo: "#6366F1",
        blue: "#3B82F6",
        cyan: "#06B6D4",
        green: "#22C55E",
        yellow: "#EAB308",
        amber: "#F59E0B",
        red: "#EF4444",
        violetbg: "#8B5CF610",
        indigobg: "#6366F110",
        bluebg: "#3B82F610",
        cyanbg: "#06B6D410",
        greenbg: "#22C55E10",
        yellowbg: "#EAB30810",
        amberbg: "#F59E0B10",
        redbg: "#EF444410",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};