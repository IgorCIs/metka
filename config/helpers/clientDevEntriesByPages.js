module.exports = pages => Object.keys(pages).reduce((entries, key) => ({
    ...entries,
    [key]: [
        'webpack-hot-middleware/client?reload=true',
        pages[key].entry
    ]
}), {})