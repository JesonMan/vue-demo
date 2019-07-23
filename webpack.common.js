const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack'); // 使用 happypack 启用多进程并发进行 loader 转换，优化构建速度
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    // 应用入口
    entry: {
        app: path.join(__dirname, 'src/index.js') // index.js作为打包的入口
    },
    // 输出目录
    output: {
        filename: '[name]-[hash:8].js', // name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
        path: path.join(__dirname, 'dist'), // 打包好之后的输出路径
        chunkFilename: '[name]-[chunkhash:8].js'
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        },
        modules: [path.resolve(__dirname, 'node_modules')] // 优化，指定第三方模块的加载绝对路径
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            use: 'happypack/loader?id=js',
            exclude: /node_modules/ // 排除指定路径，优化构建性能
        }, {
            test: /\.scss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev
                    }
                },
                'css-loader',
                'sass-loader'
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HappyPack({
            id: 'js',
            loaders: ['babel-loader?cacheDirectory']
        }),
        new DllReferencePlugin({
            manifest: require('./dll/vendor.manifest.json'),
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: './dll/vendor.dll.js'
        })
    ]
};