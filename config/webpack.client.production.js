const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { PAGES } = require('./settings')
const { clientBuildEntriesByPages } = require('./helpers')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = () => ({
    entry: clientBuildEntriesByPages(PAGES),
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true
            // }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new ManifestPlugin()
    ]
})