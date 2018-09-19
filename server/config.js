export default {
    port: process.env.PORT || 1945,
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/users',
    redis: {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/users',
        secret: 'udachi ebat'
    }
}