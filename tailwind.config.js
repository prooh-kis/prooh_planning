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
      colors: {
        primary: '#1877f2',
        greenLight: '#42b72a',
        transparent: 'transparent',
        proohYellow: '#FFE55B',
        proohCyan: '#C9EBFF',
        proohCyanFooter: '#008080',
        proohPurple: '#E1CAFF',
        proohYellowLight: '#FFFBA7',
        proohBorderGray: '#AEAEAE',
        proohGreenBgLight: '#00963C20',
        proohGreenBgLightText: '#00963C',
        proohCohortBlue: "#EDE9FF",
        proohCohortGray: "#F4F4F4"
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};