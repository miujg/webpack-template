const express = require('express')

const app = express()

const config = require('./webpack.config.js')

const middleware = require('webpack-dev-middleware')

const webpack = require('webpack')

// 启动webpack，并得到编译后的结果
const compiler = webpack(config)

app.use(middleware(compiler))

app.get('/user', (req, res) => {
    res.json({name: 'jgmiu'})
})

app.listen(3000)


