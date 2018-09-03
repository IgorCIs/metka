const { SERVER_SRC_PATH, PAGES } = require('./settings')
const path = require('path')
const { serverSSRComponentsByPages } = require('./helpers')


module.exports = ({ publicPath }) => ({
    mode: 'development',
    entry: serverSSRComponentsByPages(PAGES),
    output: {
        filename: '[name].js',
        path: path.resolve(SERVER_SRC_PATH, './ssr'),
        publicPath
    },
    devtool: false
})