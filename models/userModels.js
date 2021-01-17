const { boolean } = require('@hapi/joi')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean
})

module.exports = mongoose.model('User', userSchema)