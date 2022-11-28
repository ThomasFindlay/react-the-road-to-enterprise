/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  // Add only if you want to use the @tailwindcss/forms package
  plugins: [require('@tailwindcss/forms')],
};
