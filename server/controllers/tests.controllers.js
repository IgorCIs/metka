import Users from '../models/users'

export const setTest = (req, res) => {
    const { userID, name, answer, count, time = 0 } = req.body
    Users.findById(userID).exec((err, user) => {
        user.tests[name] = { ...user.tests[name], answer, count, time }

        user.set({ ...user  })
        
        user.save((err, saved) => 
            err ? 
                res.status(500).send(err)
                :
                res.json({ post: saved })
        )
    })    
}
