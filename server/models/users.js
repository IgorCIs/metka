import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userChema = new Schema({
    fullname: {type: 'String' },
    call: {type: 'Boolean' },
    gender: {type: 'Number' },
    age: {type: 'Number' },
    company: {type: 'String' },
    tels: [{type: 'String' }],
    comment: {type: 'String' },
    _id: {type: 'String'},
    tests: [
        {
            answer: 'String',
            attemptСount: 'Number'
        }
    ]
})

export default mongoose.model('Users', userChema)