const { merge } = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const common = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "_variables";\n',
              sassOptions: {
                includePaths: 'src/styles',
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          }),
        ]
      : []),
  ],
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

module.exports = [
  merge(common, {
    output: {
      filename: 'tygr-login.min.js',
      libraryTarget: 'window',
      library: 'TygrLogin',
    },
    mode: process.env.NODE_ENV || 'development',
  }),
  merge(common, {
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'tygr-login',
      umdNamedDefine: true,
    },
    externals: [nodeExternals()],
    mode: 'development',
  }),
];
