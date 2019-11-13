const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin')

let plugins = [];
let baseUrl = "/";


function resolve(dir) {
  return path.join(__dirname, dir)
}


if (process.env.NODE_ENV === 'production') {
  // build之后复制到服务器部署目录，需要配置相应脚本
  plugins.push(
    new WebpackShellPlugin({
      onBuildExit: [`node ./config/build/copydir`]
    })
  );
  baseUrl = "webgl4fun";
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
  publicPath: baseUrl,
  outputDir: "dist",
  devServer: {
    hot: true,
    proxy: 'http://192.168.0.68:7777'
  },
  lintOnSave: false,
  configureWebpack: {
    plugins,
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