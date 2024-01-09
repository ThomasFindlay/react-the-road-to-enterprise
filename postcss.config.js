/* eslint-env node */

export default {
  plugins: {
    'postcss-flexbugs-fixes': {},
    stylelint: {
      configFile: 'stylelint.config.js',
    },
    'postcss-import': {},
    'postcss-extend': {},
    /** Comment out if you are using tailwindcss/nesting */
    // 'postcss-nesting': {},
    /* Uncomment out if you want to add TailwindCSS to your project */
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': false,
      },
    },
    'postcss-reporter': {},
  },
};
