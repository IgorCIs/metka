import User from './models/users'

export default function () {
    User.count().exec((err, count) => {
        console.log(count)
        if (count >= 50) {
            return
        }

        const posts = new Array()

        for(let i = 0; i < 50; i++){
            posts.push(new User({
                fullname: 'Name number ' + i,
                call: true,
                gender: 1,
                age: 15,
                company: 'Company number ' + i,
                tels: ['093105382' + i, '093105382' + i],
                comment: 'text ' + i,
                _id: '' + i
            }))
        }

        User.create(posts, (error) => {
            if (!error) {
                console.log('ready to go....')
            } else {
                console.log(error)
            }
        })
    })
}