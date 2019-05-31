const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/components/styles/variables.scss'),
      ],
    })
}


module.exports = {
  devServer: {
    hot: true,
    proxy: 'http://localhost:7777'
  },
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@c': resolve('./src/components'),
      }
    },
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
}