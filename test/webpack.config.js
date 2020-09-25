/** @type {import('webpack').Configuration} */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin()],
};
