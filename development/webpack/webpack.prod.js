const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = require("./webpack.base")({
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                exclude: /foxit-lib/
            })
        ]
    },
    entry: {
        preload: path.resolve("app/preload.js"),
        main: [
            require.resolve("react-app-polyfill/ie9"),
            path.resolve("app/app.js")
        ]
    },

    output: {
        filename: "[name].[contenthash].js"
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: false,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            chunks: ["preload", "main"]
        })
    ]
});
