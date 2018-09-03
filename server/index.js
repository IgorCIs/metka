import config from './config'
import usersRoutes from './routes/users.routes'
import Express from 'express'
import mongoose from 'mongoose'
import dummyUsers from './dummyUsers'

const app = Express()


if (process.env.env === 'development' && process.env.side === 'client') {
    require('../config/server')(app)
} else {
    // ssr
    dummyUsers()
    require('./serverSSR').default(app)    
}

app.use('/api', usersRoutes)

mongoose.connect(config.mongoURL, (error) => {
    if (error) {
        console.error('Please make sure Mongodb is installed and running! ' + error) // eslint-disable-line no-console
    }
})

app.listen(config.port)