// import Admins from '../models/admins'

export function login(req, res) {
    const { login, password } = req.query

    // User.find().exec((err, users) => {
    //     err && res.status(500).send(err)

    //     const usersOnPage = users.slice(page * count, page * count + count)
    //     const pages = Math.ceil(users.length  / 10)

    // })
    
    res.json({  })
    
    console.log(login, password)
}