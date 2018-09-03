const path = require('path')
const { SERVER_BUILD_PATH, SERVER_SRC_PATH } = require('./settings')

module.exports = ({ publicPath }) => ({
    mode: 'production',
    entry: path.resolve(SERVER_SRC_PATH, './index.js'),
    output: {
        path: SERVER_BUILD_PATH,
        filename: 'server.bundle.js',
        publicPath
    },
    optimization: {
        minimize: false
    },
    node: {
        __filename: true,
        __dirname: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }
})