const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const config = require('./config/value')
const baseConfig = require('./webpack.base.js')
const isDev = process.env.NODE_ENV === 'development'
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const { entry, output } = config.server

const serverConfig = {
  target: 'node',
  entry: path.join(__dirname, entry),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, output)
  },
  devtool: 'source-map',
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
        VUE_ENV: '"server"'
      }
    }),
    new VueServerPlugin()
  ]
}

module.exports = merge(baseConfig, serverConfig)
