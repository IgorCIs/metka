import config from './config'
import usersRoutes from './routes/users.routes'
import adminsRoutes from './routes/admins.routes'
import Express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

//auth 
// import passport from 'passport'
// import session from 'express-session'
// const RedisStore = require('connect-redis')(session)

mongoose.Promise = global.Promise

const app = Express()

app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))

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