import Users from '../models/users'

export const setTest = (req, res) => {
    const { userID, testID, answer, count } = req.body
    Users.findById(userID).exec((err, user) => {
        user.tests[testID] = { ...user.tests[testID], answer, attemptСount: count }

        user.set({ ...user  })
        
        user.save((err, saved) => 
            err ? 
                res.status(500).send(err)
                :
                res.json({ post: saved })
        )
    })    
}
