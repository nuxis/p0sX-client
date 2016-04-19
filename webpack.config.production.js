import webpack from 'webpack';
import baseConfig from './webpack.config.base';
var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  ...baseConfig,

  entry: './app/app',

  output: {
    ...baseConfig.output,

    publicPath: '../build/'
  },

  module: {
    ...baseConfig.module,

    loaders: [
        baseConfig.module.loaders
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
	new CopyWebpackPlugin([
	  { from: 'app/app.html' },
	  { from: 'settings.json' },
	  { from: 'static/', to: 'static/' },
	])
    //new webpack.optimize.UglifyJsPlugin({
    //  compressor: {
    //    screw_ie8: true,
    //    warnings: false
    //  }
    //})
  ],

  target: 'electron-renderer'
};

export default config;
