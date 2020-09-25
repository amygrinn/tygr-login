/** @type {import('webpack').Configuration} */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'silent',
    writeToDisk: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'test-npm.html',
      template: 'src/test-npm.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'test-browser.html',
      template: 'src/test-browser.html',
      inject: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: '../lib/tygr-login.min.js(|.map)', to: 'dist' },
        { from: '../lib/main.css(|.map)', to: 'dist' },
      ],
    }),
  ],
};
