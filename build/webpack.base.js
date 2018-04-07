const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const vueLoaderConfig = require('./config/vue-loader.config')

const config = {
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig(),
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[path][name]__[local]--[hash:8]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
        }),
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.[contentHash:8].css'),
  ],
  resolve: {
    extensions: ['.js', '.vue'],
  },
}

module.exports = config
