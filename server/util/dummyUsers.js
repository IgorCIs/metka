import User from '../models/users'

export default function () {
    User.count().exec((err, count) => {
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
                    _id: String(Date.now()).substring(0, 6) + i * 1000,
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
                console.log('ready to go....')
            } else {
                console.log(error)
            }
        })

        console.log(count + ' dummy post available!')
    })
}


