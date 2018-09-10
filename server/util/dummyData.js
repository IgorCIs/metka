import User from '../models/users'
import Admin from '../models/admins'

export default function () {
    User.countDocuments().exec((err, count) => {
        if (count >= 50) {
            return
        }

        const posts = new Array()

        try {
            void function createUsers(i = 1){
                if(i > 50 - count) return
                posts.push(new User({
                    fullname: 'Name number ' + i,
                    call: true,
                    gender: 1,
                    age: 15,
                    company: 'Company number ' + i,
                    tels: ['093105382' + i, '093105382' + i],
                    comment: 'text ' + i,
                    _id: +String(Date.now()).substring(0, 6) + i * 1000,
                    signs: 'Черт какойто #' + i,
                    dates: [Date.now(), Date.now()],
                    tests: [
                        {
                            answer: 'ti',
                            attemptСount: 1
                        },
                        {
                            answer: 'pi',
                            attemptСount: 2
                        },
                        {
                            answer: 'dor',
                            attemptСount: 3
                        }
                    ]
                }))
                createUsers(++i)
            }()
        } catch (error) {
            console.log('No dummy posts for you')
        }

        User.create(posts, (error) => {
            if (!error) {
                console.log('DummyUsers created!')
            } else {
                console.log(error)
            }
        })
    })
    
    Admin.countDocuments().exec((err, count) => {
        if (count >= 1) return
        
        const admin = new Admin({
            login: 'superigor',
            password: 'igormegakrut'
        })

        Admin.create(admin, (error) => {
            if (!error) {
                console.log('DummyAdmin created!')
            } else {
                console.log(error)
            }
        })
    })
}


