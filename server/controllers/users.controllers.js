import User from '../models/users'

export const getUsers = (req, res) => 
    new Promise(resolve => User.find().exec((err, users) => {
        if(err) res.status(500).send(err)
        else {
            try {
                res.json({ users })
            } catch (e) {
                resolve({ users })
            }
        }
    }))


export const getUsersById = (req, res) => 
    User.findById(req.params.id).exec((err, user) => {
        err ? 
            res.status(500).send(err)
            :
            res.json({ user })
    })


export const addUser = (req, res) =>{
    const { id } = req.body
    if(id) {   
        const newUser = new User({_id: id})
        
        newUser.save((err, saved) => 
            err ?
                res.status(500).send(err)
                :
                res.json({ post: saved })
        )
    }
}

export const updateUser = (req, res) => {
    const { params, body } = req
    
    if(!params.id || !body)  res.status(403).end()

    User.findById(params.id, (err, user) => {
        if(err) res.status(500).send(err)
        else if(!user) res.status(500).json({message: 'No user width this id', id: req.params.id}) 
        else {
            user.set({ ...user, ...body })
            
            user.save((err, saved) => {
                err ? 
                    res.status(500).send(err)
                    :
                    res.json({ post: saved })
            })
        }
    })
}