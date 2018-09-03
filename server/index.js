import config from './config'
import Express from 'express'

const app = Express()

if (process.env.env === 'development' && process.env.side === 'client') {
    require('../config/server')(app)
} else {
    // ssr
    const React = require('react')
    const ReactDOMServer = require('react-dom/server')
    const App = require('./ssr/app').default
    const Admin = require('./ssr/admin').default
    const manifest = require('../dist/client/manifest')
    const path = require('path')
    const SSRTemplate = require('./SSRtemplate').default

    app.use(Express.static(path.resolve(__dirname, '../dist/client')))

    app.get('/', SSRTemplate(
        ReactDOMServer.renderToString(<App/>),
        [manifest['app.css']],
        [manifest['vendor.js'], manifest['app.js']]
    ))

    app.get('/admin', SSRTemplate(
        ReactDOMServer.renderToString(<Admin/>),
        [manifest['admin.css']],
        [manifest['vendor.js'], manifest['admin.js']]
    ))
}

app.listen(config.port)