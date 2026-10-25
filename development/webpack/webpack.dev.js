const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.base")({
    mode: "development",

    entry: {
        preload: path.resolve("app/preload.js"),
        main: [
            require.resolve("react-app-polyfill/ie9"),
            path.resolve("app/app.js")
        ]
    },

    devServer: {
        port: 9102,
        headers: {
            'Service-Worker-Allowed': '/'
        }
    },

    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: "app/index.html",
            chunks: ["preload", "main"]
        })
    ]
});
