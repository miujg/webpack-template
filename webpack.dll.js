// dll 打包配置
const path = require('path'),
    webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'dist/dll'),
        library: '_dll_[name]'
    },
    plugins: [
        // 定义动态连接库
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist/dll', 'manifest.json' )
        }),
    ]
}