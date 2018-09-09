import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {type: 'String' },
    call: {type: 'Boolean' },
    gender: {type: 'Number' },
    age: {type: 'Number' },
    company: {type: 'String' },
    tels: [{type: 'String' }],
    comment: {type: 'String' },
    _id: { type: 'String' },
    tests: [
        {
            answer: { type: 'String' },
            attemptСount: { type: 'Number' }
        }
    ],
    __v: { type: 'Number', select: false }
})

export default mongoose.model('Users', userSchema)