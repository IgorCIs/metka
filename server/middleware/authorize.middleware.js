const throwToLogin = res => {
    res.writeHead(303, {'Location': '/login'})
    res.end()
}

const throwNext = next => {
    next()
    return false
}

export default urls => (req, res, next) => 
    urls.every(url => 
        req.url.match(url) ? req.session.autorized ? throwNext(next) : throwToLogin(res) : throwNext(next)
    )