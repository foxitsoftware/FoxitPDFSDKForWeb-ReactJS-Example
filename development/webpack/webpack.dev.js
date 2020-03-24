const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.base")({
    mode: "development",

    entry: {
        adaptive: path.resolve("app/foxit-lib/adaptive.js"),
        preload: path.resolve("app/preload.js"),
        main: [
            require.resolve("react-app-polyfill/ie9"),
            path.resolve("app/app.js")
        ]
    },

    devServer: {
        port: 9102
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
            chunks: ["adaptive", "preload", "main"]
        })
    ]
});
