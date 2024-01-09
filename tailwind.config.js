import colors from 'tailwindcss/colors';
import tailwindCssForms from '@tailwindcss/forms';
/**
 * The following colours are depracated, so we remove them to get rid of warnings
 */
delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        content: ['Nunito', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
    },
  },
  plugins: [tailwindCssForms],
};
