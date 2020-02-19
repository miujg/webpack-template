const path = require('path')

module.exports = {
    //模式
    mode: 'development', // production development
    // 入口
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}