const path = require('path');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { 
                    presets: ["@babel/preset-react"], 
                    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-proposal-private-methods"]
                }
            },
        ]
    },
    'mode': 'development',
    entry: {
        square_mover: './javascript/square_mover/index.js',
    },
    output: {
        path: path.resolve(__dirname, "static/bundles"),
        filename: '[name].bundle.js',
    }, 
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/static/bundles/',
        watchContentBase: true,
        hot: true,
        proxy: {
            '!/static/bundles/**': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            }
        },
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
}