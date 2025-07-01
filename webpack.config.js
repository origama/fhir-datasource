const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:  "development",
  context: path.join(__dirname, 'src'),
  entry: {
    'module': './module.ts'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd'
  },
  externals: [
    'lodash', 'moment',
    function (context, request, callback) {
      var prefix = 'grafana/';
      if (request.indexOf(prefix) === 0) {
        return callback(null, request.substr(prefix.length));
      }
      callback();
    }
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'plugin.json' },
        { from: '../README.md' },
        { from: '../LICENSE' },
        { from: 'partials/*' },
        { from: 'img/*' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] }
          },
          'ts-loader'
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
        ]
      }
    ]
  }
}
