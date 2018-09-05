import mongoose from 'mongoose'
const Schema = mongoose.Schema

const adminChema = new Schema({
    login: { type: 'string' },
    password: { type:'string' }
})

export default mongoose.model('Admins', adminChema)