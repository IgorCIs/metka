const throwToLogin = res => {
    res.writeHead(303, {'Location': '/login'})
    res.end()
}

//gl
export default urls => (req, res, next) =>
    urls.reduce((allow, url) => new RegExp(url).test(req.url) ? false : allow, true) || req.session.authorized ?
        next() :
        throwToLogin(res)