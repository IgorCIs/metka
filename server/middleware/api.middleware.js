export default key => (req, res, next) => {
    if(process.env.env === 'production') {
        if(req.headers['x-api-key'] && req.headers['x-api-key'] === key) {
            next()
        } else {
            res.sendStatus(403)
        }
    } else {
        next()
    }
}