const path = require('path')

// Const for paths (don't needed to change).
const CLIENT_SRC_PATH = path.resolve(__dirname, '../client')
const CLIENT_BUILD_PATH = path.resolve(__dirname, '../dist/client')

exports.CLIENT_SRC_PATH = CLIENT_SRC_PATH
exports.CLIENT_BUILD_PATH = CLIENT_BUILD_PATH

exports.SERVER_SRC_PATH = path.resolve(__dirname, '../server')
exports.SERVER_BUILD_PATH = path.resolve(__dirname, '../dist')

exports.ADDONS_PATH = path.resolve(__dirname, './addons')

// Output assets.
// Add yours or change if it need.
exports.JS_ASSETS = 'assets/js'
exports.CSS_ASSETS = 'assets/css'
exports.MEDIA_ASSETS = 'assets/media'
exports.FONT_ASSETS = 'assets/fonts'

// If you want to excludes some addons.
// Example: ['font', 'image']
// Add without '.addon.js'
// IMPORTANT: don't add to excludes 'serverEntry'
exports.ADDONS_EXCLUDE = []

exports.PAGES = {
    app: {
        component: path.resolve(CLIENT_SRC_PATH, './App/App.js'),
        entry: path.resolve(CLIENT_SRC_PATH, './App/index.js'),
        filenameForHTMLPlugin: path.resolve(CLIENT_BUILD_PATH, './index.html'),
        relativePath: '/'
    },
    admin: {
        component: path.resolve(CLIENT_SRC_PATH, './Admin/Admin.js'),
        entry: path.resolve(CLIENT_SRC_PATH, './Admin/index.js'),
        filenameForHTMLPlugin: path.resolve(CLIENT_BUILD_PATH, './admin.html'),
        relativePath: '/admin'
    },
    login: {
        component: path.resolve(CLIENT_SRC_PATH, './Login/Login.js'),
        entry: path.resolve(CLIENT_SRC_PATH, './Login/index.js'),
        filenameForHTMLPlugin: path.resolve(CLIENT_BUILD_PATH, './login.html'),
        relativePath: '/login'
    }
}