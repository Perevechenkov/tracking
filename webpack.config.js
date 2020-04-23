const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    devtool: isDev ? "eval-heap-source-map" : "eval-source-map",
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        hamburger: "./assets/scripts/index.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@css': path.resolve(__dirname, 'src/assets/css'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@scripts': path.resolve(__dirname, 'src/assets/scripts'),
            '@scss': path.resolve(__dirname, 'src/scss')
        }
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: true,
                    sourceMap: true,
                    output: {
                        comments: false,
                        beautify: false
                    }
                }
            }),
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true,
                sourceMap: true
            }),
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap:true,
                            hmr: isDev,
                            reloadAll: isDev,
                        },
                    },
                    'css-loader',
                ],
            },
            /*{
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },*/
            /*{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },*/
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
        ]
    }
};
