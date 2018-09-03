import User from '../models/users'

export function getUsers(req, res) {
    const { sort = 'fullname', page = 1, count = 10 } = req.query

    User.find().sort(`-${ sort || 'fullname'}`).exec((err, users) => {
        err && res.status(500).send(err)

        const usersOnPage = users.slice(page * count, page * count + count)
        const pages = Math.ceil(users.length  / 10)

        res.json({ users: usersOnPage, page, pages })
    })
}

export function getUsersById(req, res) {
    User.findById(req.params.id).exec((err, users) => {
        err && res.status(500).send(err)

        res.json({ users })
    })
}

export function addUser(req, res) {
    const { id } = req.body

    if(id) {   
        const newUser = new User({_id: id})
        
        newUser.save((err, saved) => {
            err && res.status(500).send(err)
            
            res.json({ post: saved })
        })
    }
}

export function updateUser(req, res) {
    !req.params.id && !req.body && res.status(403).end()
    
    User.findById(req.params.id, (err, user) => {
        err && res.status(500).send(err)

        user.set({ ...req.body })

        user.save((err, saved) => {
            err && res.status(500).send(err)

            res.json({ post: saved })
        })
    })
}