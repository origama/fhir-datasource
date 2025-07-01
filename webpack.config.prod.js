const baseWebpackConfig = require('./webpack.config');
const TerserPlugin = require('terser-webpack-plugin');

const conf = {
  ...baseWebpackConfig,
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
};

module.exports = conf;
