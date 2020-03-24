const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = require("./webpack.base")({
    mode: "production",

    entry: {
        adaptive: path.resolve("app/foxit-lib/adaptive.js"),
        preload: path.resolve("app/preload.js"),
        main: [
            require.resolve("react-app-polyfill/ie9"),
            path.resolve("app/app.js")
        ]
    },

    output: {
        filename: "[name].[hash].js"
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
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            chunks: ["adaptive", "preload", "main"]
        })
    ]
});
