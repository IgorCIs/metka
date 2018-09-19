import User from '../models/users'
import Admin from '../models/admins'
import fetch from 'node-fetch'
import uuid from 'uuid-js'

const randomInteger = (min, max) => 
    Math.round(min - 0.5 + Math.random() * (max - min + 1))

const randomApi = 'https://randomuser.me/api/'

const createApiRespose = api => () => fetch(api)

const getRandomUsers = createApiRespose(randomApi)

const randomReturn = callback => randomInteger(0, 1) && callback() 

const randomDate = () => new Date(randomInteger(1971, 2017), ...[...Array(4).keys()].map(() => randomInteger(1, 30))).getTime()

const createDates = () => {
    const res = new Array()

    randomReturn(() => {
        res.push(randomDate())
        randomReturn(() => res.push(randomDate()))
    })

    return res
}

const createPosts = data =>
    new User({
        _id: uuid.create().toString().substring(0, 6),
        gender: data.gender == 'male' ? 1 : 0,
        fullname: data.name.first + ' ' + data.name.last,
        call: randomInteger(0, 1),
        age: randomInteger(18, 50),
        comment: 'Comment',
        tels: [data.phone, data.cell],
        company: data.location.street,
        signs: data.location.state,
        dates: [...createDates()],
        tests: {
            'first': {
                answer: 'good',
                count: 1
            },
            'second': {
                answer: 'bad',
                count: 6
            },
            'third': {
                answer: 'notbad',
                count: 3
            }
        }
    })

export default function () {
    User.countDocuments().exec((err, count) => {
        if (count >= 50) return

        try {
            void function createUsers(i){
                if(i > 50) return
                getRandomUsers().then(response =>{
                    response.json().then(data => 
                        User.create(
                            createPosts(data.results[0]), () => {}
                        )
                    ).catch(() => {})
                })

                createUsers(++i)
            }(1)

        } catch (error) {
            console.log('No dummy posts for you')
        }
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