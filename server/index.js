import config from './config'
import usersRoutes from './routes/users.routes'
import adminsRoutes from './routes/admins.routes'
import testsRoutes from './routes/tests.routes'
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

import autorizeMiddleware from './middleware/authorize.middleware'

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

import generate from './util/generatekeys'

process.env.DUMMY_DATA && require('./util/dummyData').default()
generate()

import apiMiddleware from './middleware/api.middleware';


//api
app.use('/api', apiMiddleware(config.apikey), usersRoutes)
app.use('/api', apiMiddleware(config.apikey), adminsRoutes)
app.use('/api', apiMiddleware(config.apikey), testsRoutes)

mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.error('MongoDB not running, error: ' + error) 
    } else 
        console.log('Let\'s roll')
})


app.listen(config.port, '0.0.0.0')

