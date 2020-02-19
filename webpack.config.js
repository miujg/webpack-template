const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    //模式
    mode: 'development', // production development
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
        }) 
    ]
}