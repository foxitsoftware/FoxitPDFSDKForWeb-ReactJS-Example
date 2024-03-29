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
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: options.babelLoaderOptions
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /addon\.info\.json$/,
                use: [{
                    loader: 'babel-loader',
                    options: options.babelLoaderOptions
                }, '@foxitsoftware/addon-loader'],
                type: 'javascript/auto'
            }
        ]
    },
    plugins: options.plugins.concat([
        new CopyWebpackPlugin({
            patterns:[
            {
                from: "./node_modules/@foxitsoftware/foxit-pdf-sdk-for-web-library/lib",
                to: "foxit-lib",
                force: true,
                globOptions: {
                    ignore: [
                        "{PDFViewCtrl,UIExtension}*.js",
                        "preload-jr-worker.js"
                    ]
                }
                
            },
            {
                from: './app/assets',
                to: './',
                force: true
            }
        ]
        })
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
