export default {
    port: process.env.PORT || 8080,
    mongoURL: 'mongodb://super-app:111111qq@ds161112.mlab.com:61112/super-igor-super-app' || 'mongodb://localhost:27017/users',
    redis: {
        url: 'mongodb://super-app:111111qq@ds161112.mlab.com:61112/super-igor-super-app' || 'mongodb://localhost:27017/users',
        secret: 'udachi ebat'
    }
}
