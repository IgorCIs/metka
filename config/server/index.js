const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const { publicPath = '/' } = process.env
const { provideMiddleware } = require('../helpers')

const config = require('../../webpack.config.js')({
    publicPath,
    env: 'development',
    side: 'client',
    hash: false
})
const compiler = webpack(config)

const devMiddleware = webpackDevMiddleware(compiler, {publicPath, logLevel: 'error', headers: { 'X-Custom-Foo': 'bar' }})
const hotMiddleware = webpackHotMiddleware(compiler, {path: '/__webpack_hmr', headers: { 'X-Custom-Foo': 'bar' }})

module.exports = app => provideMiddleware(app, devMiddleware, hotMiddleware, compiler)