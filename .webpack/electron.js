import webpack from 'webpack';
import baseConfig from './base';

export default {
    ...baseConfig,

    entry: './src/main',
    output: {
        ...baseConfig.output,
        filename: 'main.js',
        publicPath: './app'
    },

    plugins: [
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
