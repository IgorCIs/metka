const { CLIENT_BUILD_PATH, JS_ASSETS } = require('../settings')

module.exports = ({ side, hash, publicPath }) => side === 'client' ? {
    output: {
        publicPath,
        path: CLIENT_BUILD_PATH,
        filename: `${JS_ASSETS}/[name]${hash ? '.[contenthash]' : ''}.js`
    }
} : {}