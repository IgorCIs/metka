export default {
    port: process.env.PORT || 8080,
    mongoURL: 'mongodb://localhost:27017/users',
    redis: {
        url: 'mongodb://localhost:27017/users',
        secret: 'udachi ebat'
    }
}
