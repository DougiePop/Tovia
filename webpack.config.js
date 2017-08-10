const path = require('path');
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve('client/public/dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']}},
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/, query: {presets: ['es2015', 'react']}},
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            { test: /\.css$/, use: ['style-loader', {loader: "css-loader", options: {modules: true, sourceMap: true, importLoaders: 1, localIdentName: "[name]--[local]--[hash:base64:8]"}}, 'sass-loader', "postcss-loader"]},

        ]
    }
}