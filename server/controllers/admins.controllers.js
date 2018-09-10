import Admins from '../models/admins'

export const login = (req, res) => {
    const { login, password } = req.query
    
    Admins.findOne({ 'login': login }).exec((err, admin) => {
        if (err) res.status(500).send(err)
        else if (admin && admin.password === password) {
            req.session.username = login
            req.session.authorized = true
            
            res.json({ logged: true, login })
        } else {
            res.json({ logged: false })
        }
    })
}

export const logout = (req, res) => {
    delete req.session.username 
    delete req.session.authorized

    res.json({ logged: false })
}

export const isLogged = (req, res) => 
    res.json({ logged: req.session.autorized || false })
