const { string, required } = require('@hapi/joi')
const mongoose = require('mongoose')
const roleSchema = require('../models/role.models')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    roles:[{
        ref: 'Role',
        type: mongoose.Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User', userSchema)