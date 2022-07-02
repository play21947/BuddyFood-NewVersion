const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    phone_number: String,
    password: String,
    email: String,
    role: Number
})


const user = mongoose.model('users', UserSchema)

module.exports = user