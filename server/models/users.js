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
    signs: {type: 'String' },
    dates: [{type: 'String' }],
    _id: { type: 'String' },
    tests: {
        type: {
            answer: { type: 'String' },
            count: { type: 'Number' }
        }
    },
    callbackMessage: { type: String },
    __v: { type: 'Number', select: false }
})

export default mongoose.model('Users', userSchema)