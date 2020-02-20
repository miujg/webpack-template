const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
    MiniCssExtractPlugin = require('mini-css-extract-plugin')
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
    TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    //模式
    mode: 'production', // production development
    // 入口
    entry: './src/index.js',
    output: {
        filename: 'bundle.js', // 可以配置hash: bundle.[hash:8].js
        path: path.resolve(__dirname, 'dist')
    },
    // webpack serve 配置
    devServer: {
        port: 3000,
        // 进度条
        progress: true,
        contentBase: './dist',
        compress: true
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }) 
    ],
    // 模块
    module: {
        rules: [
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