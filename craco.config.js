const postcssConfig = require('./postcss.config')
const cracoAlias = require('craco-alias')
module.exports = {
  style: {
    postcss: postcssConfig,
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: './',
        /* tsConfigPath should point to the file where "baseUrl" and "paths" 
          are specified*/
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
}
