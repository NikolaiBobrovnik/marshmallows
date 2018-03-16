const path = require('path')
const merge = require('webpack-merge')

require('babel-polyfill').default

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  app: path.join(__dirname, '../src')
}

process.env.BABEL_ENV = TARGET

const common = {

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    modules: ['node_modules', PATHS.app]
  },

  module: {
    rules: [{
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=application/font-woff']
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=application/font-woff2']
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=application/octet-stream']
    }, {
      test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=application/font-otf']
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: ['file-loader']
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['url-loader?limit=10000&mimetype=image/svg+xml']
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.png$/,
      use: ['file-loader?name=[name].[ext]']
    }, {
      test: /\.jpg$/,
      use: ['file-loader?name=[name].[ext]']
    }, {
      test: /\.gif$/,
      use: ['file-loader?name=[name].[ext]']
    }, {
      test: /\.ico$/,
      use: ['file-loader?name=[name].[ext]']
    }]
  }
}

if (TARGET === 'dev' || TARGET === 'dev_mobile') {
  module.exports = merge(require('./dev.config.js'), common)
} else {
  module.exports = function (env) { return merge(require('./staging.config.js')(env), common) }
}
