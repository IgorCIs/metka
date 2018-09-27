export default key => (req, res, next) => {
    if(req.headers['x-api-key'] && req.headers['x-api-key'] === key) {
        next()
    } else {
        res.sendStatus(403)
    }
}