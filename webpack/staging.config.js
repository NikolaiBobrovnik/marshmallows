const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const precss = require('precss')
const path = require('path')

let ManifestPlugin = require('webpack-manifest-plugin')

let extractTemplateLibs = new ExtractTextPlugin('vendor-[name].[contenthash].css')
let extractTemplate = new ExtractTextPlugin({ filename: '[name].[contenthash].css', ignoreOrder: true })

module.exports = function (env) {
  const apiUrls = {
    staging: 'http://kalashnikov.ip32.ru/api/',
    production: 'http://ak-api.kalashnikovgroup.ru/'
  }

  const publicPath = '/dist-production/'

  return {
    context: path.join(__dirname, '/../src'),
    entry: {
      desktop: './index-desktop',
      mobile: './index-mobile'
    },

    output: {
      filename: '[name].[chunkhash].js',
      publicPath: publicPath,
      path: path.join(__dirname, '..' + publicPath)
    },

    module: {
      rules: [{
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractTemplate.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:10]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer({
                    browsers: ['last 2 versions']
                  }),
                  postcssImport(),
                  precss
                ]
              }
            }
          }
        ])
      }, {
        test: /\.scss$/,
        use: extractTemplate.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:10]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer({
                    browsers: ['last 2 versions']
                  })
                ]
              }
            }
          },
          { loader: 'sass-loader' }
        ])
      }, {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, '../src')
        ],
        use: extractTemplateLibs.extract(['css-loader'])
      }]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        '__API_URL__': JSON.stringify(apiUrls[env.platform])
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.CommonsChunkPlugin({
        chunks: ['desktop'],
        name: 'vendor-desktop',
        minChunks: function (module) {
          if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
            return false
          }
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        chunks: ['mobile'],
        name: 'vendor-mobile',
        minChunks: function (module) {
          if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
            return false
          }
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',  // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        minChunks: Infinity
      }),
      extractTemplateLibs,
      extractTemplate,
      new ManifestPlugin({
        map: (file) => {
          if (file.path.match(/\.\w{2,4}\.(?:map|gz)$|\.\w+$/i)[0] === '.css') {
            if (file.path.indexOf('vendor-desktop') !== -1) {
              file.name = path.join(path.dirname(file.path), 'vendor-desktop.css')
            } else if (file.path.indexOf('vendor-mobile') !== -1) {
              file.name = path.join(path.dirname(file.path), 'vendor-mobile.css')
            } else {
              file.name = path.join(path.dirname(file.path), file.name)
            }
          } else {
            file.name = path.join(path.dirname(file.path), file.name)
          }
          return file
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true
        },
        comments: false
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
