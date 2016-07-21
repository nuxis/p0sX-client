import path from 'path';

export default {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=255000'
            }
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'app'),
        filename: 'app.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: [

    ],
    externals: [
        // put your node 3rd party libraries which can't be built with webpack here
        // (mysql, mongodb, and so on..)
    ],
    devtool: 'source-map'
};
