const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: Object.assign(
        {
            path: path.resolve(process.cwd(), "dist"),
            publicPath: "/"
        },
        options.output
    ),
    devServer: options.devServer,
    optimization: options.optimization,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules|foxit-lib/,
                use: {
                    loader: "babel-loader",
                    options: options.babelLoaderOptions
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /addon\.info\.json$/,
                include: /foxit-lib/,
                use: [{
                    loader: 'babel-loader',
                    options: options.babelLoaderOptions
                }, '@foxitsoftware/addon-loader'],
                type: 'javascript/auto'
            }
        ]
    },
    plugins: options.plugins.concat([
        new CopyWebpackPlugin([
            {
                from: "app/foxit-lib/",
                to: "foxit-lib",
                force: true,
                ignore: [
                    "{PDFViewCtrl,UIExtension}*.js",
                    "preload-jr-worker.js"
                ]
            }
        ])
    ]),
    resolve: {
        modules: ["node_modules", "app"],
        extensions: [".js", ".jsx", ".react.js"],
        mainFields: ["browser", "jsnext:main", "main"]
    },
    devtool: options.devtool,
    target: "web",
    externals: ['UIExtension', 'PDFViewCtrl'],
    performance: options.performance || {}
});
