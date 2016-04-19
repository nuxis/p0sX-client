import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  entry: './main.development',

  output: {
    path: __dirname,
    filename: './build/main.js'
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compressor: {
    //    warnings: false
    //  }
    //}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false
  },

  externals: [
    ...baseConfig.externals,
    'font-awesome'
  ]
};