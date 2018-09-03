import React  from 'react'
import ReactDOMServer  from 'react-dom/server'
import App  from './ssr/app'
import Admin  from './ssr/admin'
import manifest  from '../dist/client/manifest'
import path  from 'path'
import Express from 'express'
import SSRTemplate  from './SSRtemplate'

const middleware = app => {
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

export default middleware