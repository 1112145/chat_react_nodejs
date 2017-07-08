var path = require("path");
var webpack = require("webpack");


module.exports = {
    entry: ["./example/demoApp.js"],
    output: {
        path: path.join(__dirname, "../server/example/www/"),
        publicPath: path.join(__dirname, "../server/example/www/"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", {
                    loader: "sass-loader",
                    options: {
                        data: '@import "theme";',
                        includePaths: [path.join(__dirname, 'src')]
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'stage-2', 'react'],
                    plugins: []
                }
            }

        ],
    },
    resolve: {
        alias: {
        },
        extensions: ['.js', '.jsx']
    },
    plugins: [
    ]
};
