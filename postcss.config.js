/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require('stylelint')({
      configFile: 'stylelint.config.js',
    }),
    require('postcss-extend'),
    require('precss'),
    require('postcss-preset-env'),
    require('tailwindcss')('tailwind.config.js'),
    require('postcss-nested'),
    require('autoprefixer')(),
    require('postcss-reporter'),
  ],
}
