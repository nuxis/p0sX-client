var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: { path: __dirname, filename: 'app/app.js' },
    module: {
        loaders: [
          {
              test: /.jsx?$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015', 'react']
              }
          },
          {
              test: /.json?$/,
              loader: 'json-loader'
          }
        ]
    },
};
