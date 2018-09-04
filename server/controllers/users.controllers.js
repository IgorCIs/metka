import User from '../models/users'

export function getUsers(req, res) {
    let { page: sendedPage = 1, count = 30 } = req.query
    sendedPage = +sendedPage
    count = +count
    
    const page = sendedPage - 1

    return new Promise(resolve => User.find().exec((err, users) => {
        if(err) res.status(500).send(err)
        else {
            const usersOnPage = users.slice(page * count, page * count + count)
            const pages = Math.ceil(users.length / count)
            const result = { users: usersOnPage, page: sendedPage, pages }
            
            try {
                res.json(result)
            }
            catch (e) {
                resolve(result)
            }
        }
    }))
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