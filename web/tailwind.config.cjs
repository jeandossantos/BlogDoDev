/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {},
    colors: {
      zinc: {
        900: '#060606',
        800: '#0D0D0E',
        700: '#131315',
        500: '#71717A',
        200: '#D1D1D8',
        100: '#D9D9D9',
        black: '#000',
        secondary: '#6c757d',
        'secondary-hover': '#5c636a',
      },
      red: {
        google: '#DD4B39',
        700: '#E23E29',
        danger: '#dc3545',
        'danger-hover': '#bb2d3b',
      },
      yellow: {
        warning: '#ffc107',
        'warning-hover': '#ffca2c',
      },
    },
  },
  plugins: [],
};
