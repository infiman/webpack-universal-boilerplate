const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './src/client',
  ],
  stats: 'minimal',
  target: 'web',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'babel-loader',
      }, {
        loader: 'eslint-loader',
      }],
      exclude: /node_modules/,
    }, {
      test: /\.(css|scss)$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'postcss-loader',
        options: {
          includePaths: ['./node_modules'],
        },
      },
      ],
    }, {
      test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: '/public/',
        },
      }],
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/public/',
    filename: 'client.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
};
