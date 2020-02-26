const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
    MiniCssExtractPlugin = require('mini-css-extract-plugin')
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    TerserJSPlugin = require('terser-webpack-plugin')
    webpack = require('webpack')

module.exports = {
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    //模式
    mode: 'development', // production development
    // 入口
    entry: './src/index.js',
    // 出口
    output: {
        filename: 'bundle.js', // 可以配置hash: bundle.[hash:8].js
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://127.0.0.1:8080/'
    },
    // webpack serve 配置
    devServer: {
        port: 8080,
        // 进度条
        progress: true,
        contentBase: './dist',
        compress: true,
        // 数据mock
        // before(app) {
        //     app.get('/user', (req, res) => {
        //         res.json({name: 'jgmiu-mock'})
        //     })
        // },
        // 代理的配置
        // proxy: {
        //     // 常用的开发模式下的代理配置，解决跨域
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         pathRewrite: {'^/api': ''},
        //     }
        // }
    },
    // 配置插件
    plugins: [
        // http插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        // 用于分离css
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        //  webpack相关插件
        new webpack.ProvidePlugin({
            // 全局变量引入
            // $: 'jquery'
        })
    ],
    // 模块
    module: {
        rules: [
            // 图片处理
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 这里的单位事byte 字节
                            limit: 20 * 1024,
                            outputPath: 'img/'
                        },
                    },
                ]
            },
            // babel相关，代码转换
            {
                test: /.js$/, 
                // 一定要加这个 不然babel回去解析第三方依赖，造成报错
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                // 装饰器 顺序必须在claa后面
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                // class 
                                ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                                // 生成器兼容
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }
            ]},
            // style-loader 把css插入到head标签中
            // css-loader 解析@import这种类型的语言
            // sass-loader 将scss => css
            // loader 执行顺序： 从下到上 从左到右
            // 写成对象模式可以添加配置
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader',{
                loader: 'postcss-loader',
                options: {
                    plugins: [require('autoprefixer')({
                        overrideBrowserslist: ['last 15 versions']
                    })]
                }
            }, 'sass-loader']}
        ]
    }
}