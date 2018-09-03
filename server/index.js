import config from './config'
import usersRoutes from './routes/users.routes'
import Express from 'express'
import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const app = Express()


if (process.env.env === 'development' && process.env.side === 'client') {
    require('../config/server')(app)
} else {
    // ssr
    require('./serverSSR').default(app)    
}

process.env.env === 'development' && require('./util/dummyUsers').default()

app.use('/api', usersRoutes)

mongoose.connect(config.mongoURL, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running! ' + error) 
    }
})

app.listen(config.port)