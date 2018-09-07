import Admins from '../models/admins'

export function login(req, res) {
    const { login, password } = req.query
    
    Admins.findOne({ 'login': login }).exec((err, admin) => {
        if(err) res.status(500).send(err)
        else if (admin.password === password) {
            req.session.username = login
            req.session.autorized = true
            
            res.json({ logged: true, login })
        } else {
            res.json({ logged: false })
        }
    })    
}

export function logout(req, res) {
    delete req.session.username 
    delete req.session.autorized 

    res.json({ logged: false, login })
}