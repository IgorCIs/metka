import config from './config'
import usersRoutes from './routes/users.routes'
import adminsRoutes from './routes/admins.routes'
import Express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import cookieParser from 'cookie-parser'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session)

mongoose.Promise = global.Promise

const app = Express()

app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))

app.use(cookieParser())
app.use(session({
    secret: config.redis.secret,
    store: new MongoStore({ url: config.redis.url }),
    resave: true,
    saveUninitialized: true
}))

import autorizeMiddleware from './middleware/autorize.middleware'

//authMidleware
const protectedPages = [
    '/admin$', '/admin/'
]

app.use('/', autorizeMiddleware(protectedPages))

if (process.env.env === 'development' && process.env.side === 'client') {
    require('../config/server')(app)
} else {
    // ssr
    require('./serverSSR').default(app)    
}

process.env.env === 'development' && require('./util/dummyData').default()

//api
app.use('/api', usersRoutes)
app.use('/api', adminsRoutes)


mongoose.connect(config.mongoURL, (error) => {
    if (error) {
        console.error('MongoDB not running, error: ' + error) 
    }
})

app.listen(config.port)