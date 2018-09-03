const path = require('path')
const webpack = require('webpack')
const { CLIENT_SRC_PATH, PAGES } = require('./settings')
const { clientDevEntriesByPages, HTMLWebpackPluginsByPages } = require('./helpers')

module.exports = () => ({
    entry: clientDevEntriesByPages(PAGES),
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...HTMLWebpackPluginsByPages({
            pages: PAGES,
            template: path.resolve(CLIENT_SRC_PATH, './index.html'),
            commons: ['vendor']
        })
    ]
})