const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const HTMLPlugin = require('html-webpack-plugin')
const { ifElse, removeNil } = require('./util/index')
const config = require('./config/value')
const baseConfig = require('./webpack.base.js')

const isDev = process.env.NODE_ENV === 'development'
const ifDev = ifElse(isDev)

const { entry, output, port } = config.client

const clientConfig = {
  target: 'web',
  entry: ifDev(path.join(__dirname, entry), {
    app: path.join(__dirname, entry),
    vendor: ['vue']
  }),
  output: ifDev({
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, output),
    publicPath: '/public/'
  }, {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, output),
    publicPath: '/public/'
  }),
  devServer: {
    port: port,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    contentBase: path.join(__dirname, output),
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    hot: true
  },
  devtool: ifDev('#cheap-module-eval-source-map', ''),
  plugins: removeNil([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin({
      template: path.join(__dirname, '../index.html'),
    }),
    new VueClientPlugin(),
    ifDev(new webpack.HotModuleReplacementPlugin(), ''),
    ifDev('', new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })),
    ifDev('', new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })),
    ifDev('', new webpack.NamedChunksPlugin()),
    ifDev('', new UglifyJsPlugin({
      exclude: /node_modules/,
      cache: true,
      parallel: true
    }))
  ])
}

module.exports = merge(baseConfig, clientConfig)
