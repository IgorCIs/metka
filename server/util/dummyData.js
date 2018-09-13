import User from '../models/users'
import Admin from '../models/admins'
import fetch from 'node-fetch'
import uuid from 'uuid-js'

const randomInteger = (min, max) => 
    Math.round(min - 0.5 + Math.random() * (max - min + 1))

const randomApi = 'https://randomuser.me/api/'

const createApiRespose = api => () => fetch(api)

const getRandomUsers = createApiRespose(randomApi)

const randomReturn = value => randomInteger(0, 1) ? value : ''

const randomDate = year => new Date(year, 1, 1, 1, 1, 1, 1)

const createDates = () => {
    
}


const createPosts = data =>
    new User({
        _id: uuid.create().toString().substring(0, 6),
        gender: data.gender == 'male' ? 1 : 0,
        fullname: data.name.first + ' ' + data.name.last,
        call: randomInteger(0, 1),
        age: randomInteger(18, 50),
        comment: 'ХЗ ЧТО ТУТ ВСТАВИТЬ ХОТЬ УБЕЙ',
        tels: [data.phone, data.cell],
        company: data.location.street,
        signs: data.location.state,
        dates: [randomReturn(Date.now()), randomReturn(Date.now())],
        tests: [
            {
                answer: 'Test #1',
                attemptСount: 1
            },
            {
                answer: 'Test #2',
                attemptСount: 2
            },
            {
                answer: 'Test #3',
                attemptСount: 3
            }
        ]
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