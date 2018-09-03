const { CLIENT_SRC_PATH,  } = require('../settings')
const path = require('path')

module.exports = pages => Object.keys(pages).reduce((entry, page) => ({
    ...entry,
    [page]: path.resolve(CLIENT_SRC_PATH, pages[page].component)
}), {})
