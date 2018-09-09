const { PAGES } = require('../settings')

module.exports = (app, devMiddleware, hotMiddleware, compiler) => {
    app.use(devMiddleware)
    app.use(hotMiddleware)

    Object.keys(PAGES).forEach(pageName => {
        app.get([PAGES[pageName].relativePath, PAGES[pageName].relativePath + '/*'], (req, res, next) => {
            compiler.outputFileSystem.readFile(PAGES[pageName].filenameForHTMLPlugin, (err, result) => {
                if (err) return next(err)

                res.set('content-type', 'text/html')
                res.send(result)
                res.end()
            })
        })
    })
}