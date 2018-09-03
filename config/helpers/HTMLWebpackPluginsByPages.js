const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = ({pages, template, commons}) => Object.keys(pages).map(page =>
    new HtmlWebpackPlugin({
        template,
        chunks: [...commons, page],
        filename: pages[page].filenameForHTMLPlugin
    })
)