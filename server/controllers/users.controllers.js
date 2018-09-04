import User from '../models/users'

export function getUsers(req, res) {
    const {page: sendedPage = 1, count = 10 } = req.query,
        page = sendedPage - 1

    User.find().exec((err, users) => {
        if(err) res.status(500).send(err)
        else {
            const usersOnPage = users.slice(page * count, page * count + count)
            const pages = Math.ceil(users.length  / 10)
            
            res.json({ users: usersOnPage, page: sendedPage, pages })
        }
    })
}

export function getUsersById(req, res) {
    User.findById(req.params.id).exec((err, users) => {
        if(err)  res.status(500).send(err)
        else {
            res.json({ users })
        }
    })
}

export function addUser(req, res) {
    const { id } = req.body

    if(id) {   
        const newUser = new User({_id: id})
        
        newUser.save((err, saved) => {
            if(err) res.status(500).send(err)
            else {
                res.json({ post: saved })
            }
        })
    }
}

export function updateUser(req, res) {
    const { params, body } = req
    
    if(!params.id || !body)  res.status(403).end()
    
    User.findById(params.id, (err, user) => {
        if(err) err && res.status(500).send(err)
        else if(!user) res.status(500).json({message: 'No user width this id', id: req.params.id}) 
        else {
            user.set({ ...user, ...body})
            
            user.save((err, saved) => {
                if(err) res.status(500).send(err)    
                else res.json({ post: saved })
        
            })
        }

    })
}