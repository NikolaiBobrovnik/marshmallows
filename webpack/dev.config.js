const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')
const precss = require('precss')
const path = require('path')

const TARGET = process.env.npm_lifecycle_event
const entryPath = {
  dev: './src/index-desktop',
  dev_mobile: './src/index-mobile'
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    'react-hot-loader/patch',
    entryPath[TARGET]
  ],
  output: {
    publicPath: '/dist/',
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, '../src')],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              convertToAbsoluteUrls: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
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
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              convertToAbsoluteUrls: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: function () {
                return [
                  autoprefixer()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __API_URL__: JSON.stringify('http://kalashnikov.ip32.ru/api/')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
