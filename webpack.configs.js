module.exports = {
  mode: 'development',
  context: 'D:/GitHub/WebGL4Fun',
  devtool: 'cheap-module-eval-source-map',
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'D:/GitHub/WebGL4Fun/dist',
    filename: '[name].js',
    publicPath: '/',
    globalObject: '(typeof self !== \'undefined\' ? self : this)'
  },
  resolve: {
    alias: {
      '@': 'D:/GitHub/WebGL4Fun/src',
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@c': 'D:/GitHub/WebGL4Fun/src/components'
    },
    extensions: ['.mjs', '.js', '.jsx', '.vue', '.json', '.wasm'],
    modules: ['node_modules', 'D:/GitHub/WebGL4Fun/node_modules', 'D:/GitHub/WebGL4Fun/node_modules/@vue/cli-service/node_modules']
  },
  resolveLoader: {
    modules: ['D:/GitHub/WebGL4Fun/node_modules/@vue/cli-plugin-babel/node_modules', 'node_modules', 'D:/GitHub/WebGL4Fun/node_modules', 'D:/GitHub/WebGL4Fun/node_modules/@vue/cli-service/node_modules']
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [ /* config.module.rule('vue') */ {
      test: /\.vue$/,
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: 'D:/GitHub/WebGL4Fun/node_modules/.cache/vue-loader',
          cacheIdentifier: '1dfbb1cd'
        }
      }, {
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          },
          cacheDirectory: 'D:/GitHub/WebGL4Fun/node_modules/.cache/vue-loader',
          cacheIdentifier: '1dfbb1cd'
        }
      }]
    }, /* config.module.rule('images') */ {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        }
      }]
    }, /* config.module.rule('svg') */ {
      test: /\.(svg)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]'
        }
      }]
    }, /* config.module.rule('media') */ {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]'
            }
          }
        }
      }]
    }, /* config.module.rule('fonts') */ {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        }
      }]
    }, /* config.module.rule('pug') */ {
      test: /\.pug$/,
      oneOf: [ /* config.module.rule('pug').oneOf('pug-vue') */ {
        resourceQuery: /vue/,
        use: [{
          loader: 'pug-plain-loader'
        }]
      }, /* config.module.rule('pug').oneOf('pug-template') */ {
        use: [{
          loader: 'raw-loader'
        }, {
          loader: 'pug-plain-loader'
        }]
      }]
    }, /* config.module.rule('css') */ {
      test: /\.css$/,
      oneOf: [ /* config.module.rule('css').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }]
      }, /* config.module.rule('css').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }]
      }, /* config.module.rule('css').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }]
      }, /* config.module.rule('css').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }]
      }]
    }, /* config.module.rule('postcss') */ {
      test: /\.p(ost)?css$/,
      oneOf: [ /* config.module.rule('postcss').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }]
      }, /* config.module.rule('postcss').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }]
      }, /* config.module.rule('postcss').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }]
      }, /* config.module.rule('postcss').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }]
      }]
    }, /* config.module.rule('scss') */ {
      test: /\.scss$/,
      oneOf: [ /* config.module.rule('scss').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }, {
          loader: 'style-resources-loader',
          options: {
            patterns: ['D:/GitHub/WebGL4Fun/src/components/styles/variables.scss']
          }
        }]
      }, /* config.module.rule('scss').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }, {
          loader: 'style-resources-loader',
          options: {
            patterns: ['D:/GitHub/WebGL4Fun/src/components/styles/variables.scss']
          }
        }]
      }, /* config.module.rule('scss').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }, {
          loader: 'style-resources-loader',
          options: {
            patterns: ['D:/GitHub/WebGL4Fun/src/components/styles/variables.scss']
          }
        }]
      }, /* config.module.rule('scss').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false
          }
        }, {
          loader: 'style-resources-loader',
          options: {
            patterns: ['D:/GitHub/WebGL4Fun/src/components/styles/variables.scss']
          }
        }]
      }]
    }, /* config.module.rule('sass') */ {
      test: /\.sass$/,
      oneOf: [ /* config.module.rule('sass').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
            indentedSyntax: true
          }
        }]
      }, /* config.module.rule('sass').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
            indentedSyntax: true
          }
        }]
      }, /* config.module.rule('sass').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
            indentedSyntax: true
          }
        }]
      }, /* config.module.rule('sass').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: false,
            indentedSyntax: true
          }
        }]
      }]
    }, /* config.module.rule('less') */ {
      test: /\.less$/,
      oneOf: [ /* config.module.rule('less').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }]
      }, /* config.module.rule('less').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }]
      }, /* config.module.rule('less').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }]
      }, /* config.module.rule('less').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: false
          }
        }]
      }]
    }, /* config.module.rule('stylus') */ {
      test: /\.styl(us)?$/,
      oneOf: [ /* config.module.rule('stylus').oneOf('vue-modules') */ {
        resourceQuery: /module/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: false,
            preferPathResolver: 'webpack'
          }
        }]
      }, /* config.module.rule('stylus').oneOf('vue') */ {
        resourceQuery: /\?vue/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: false,
            preferPathResolver: 'webpack'
          }
        }]
      }, /* config.module.rule('stylus').oneOf('normal-modules') */ {
        test: /\.module\.\w+$/,
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: false,
            preferPathResolver: 'webpack'
          }
        }]
      }, /* config.module.rule('stylus').oneOf('normal') */ {
        use: [{
          loader: 'vue-style-loader',
          options: {
            sourceMap: false,
            shadowMode: false
          }
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: false,
            importLoaders: 1
          }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: false,
            preferPathResolver: 'webpack'
          }
        }]
      }]
    }, /* config.module.rule('js') */ {
      test: /\.m?jsx?$/,
      exclude: [function () {
        /* omitted long function */
      }],
      use: [{
        loader: 'cache-loader',
        options: {
          cacheDirectory: 'D:/GitHub/WebGL4Fun/node_modules/.cache/babel-loader',
          cacheIdentifier: '35703513'
        }
      }, {
        loader: 'babel-loader'
      }]
    }]
  },
  plugins: [ /* config.plugin('vue-loader') */ new VueLoaderPlugin(), /* config.plugin('define') */ new DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
      BASE_URL: '"/"'
    }
  }), /* config.plugin('case-sensitive-paths') */ new CaseSensitivePathsPlugin(), /* config.plugin('friendly-errors') */ new FriendlyErrorsWebpackPlugin({
    additionalTransformers: [function () {
      /* omitted long function */
    }],
    additionalFormatters: [function () {
      /* omitted long function */
    }]
  }), /* config.plugin('hmr') */ new HotModuleReplacementPlugin(), /* config.plugin('progress') */ new ProgressPlugin(), /* config.plugin('html') */ new HtmlWebpackPlugin({
    templateParameters: function () {
      /* omitted long function */
    },
    template: 'D:/GitHub/WebGL4Fun/public/index.html'
  }), /* config.plugin('pwa') */ new HtmlPwaPlugin({
    name: 'webgl'
  }), /* config.plugin('preload') */ new PreloadPlugin({
    rel: 'preload',
    include: 'initial',
    fileBlacklist: [/\.map$/, /hot-update\.js$/]
  }), /* config.plugin('prefetch') */ new PreloadPlugin({
    rel: 'prefetch',
    include: 'asyncChunks'
  }), /* config.plugin('copy') */ new CopyWebpackPlugin([{
    from: 'D:/GitHub/WebGL4Fun/public',
    to: 'D:/GitHub/WebGL4Fun/dist',
    toType: 'dir',
    ignore: ['.DS_Store']
  }])],
  entry: {
    app: ['./src/main.js']
  }
}