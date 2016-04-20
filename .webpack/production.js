import webpack from 'webpack';
import baseConfig from './base';
// var CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    ...baseConfig,

    entry: './src/app',

    output: {
        ...baseConfig.output,

        publicPath: '../app/'
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
        })
        //new CopyWebpackPlugin([
        //  { from: 'app/app.html' },
        //  { from: 'static/', to: 'static/' },
        //])
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
