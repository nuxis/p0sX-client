import webpack from 'webpack';
import baseConfig from './base';

export default {
    ...baseConfig,

    entry: './src/app',

    output: {
        ...baseConfig.output,

        publicPath: './app'
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "root.jQuery": "jquery",
            Hammer: "hammerjs/hammer"
        })
    ],

    target: 'electron-renderer'
};

