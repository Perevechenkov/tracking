const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => {
    return isDev ? `[name].${ext}` : `[name].${ext}?=[contenthash]`
};

module.exports = {
    devtool: isDev ? "eval-cheap-source-map" : "eval-source-map",
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: "./assets/scripts/index.js"
    },
    output: {
        filename: filename("js"),
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@css': path.resolve(__dirname, 'src/assets/css'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
            '@scripts': path.resolve(__dirname, 'src/assets/scripts'),
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@images': path.resolve(__dirname, 'src/assets/images')
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
    devServer: {
        port: 4000,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: false
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new webpack.SourceMapDevToolPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: true,
                            hmr: isDev,
                            reloadAll: isDev,
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                use: ["file-loader?name=./images/[name].[ext]"]
            }
        ]
    }
};
