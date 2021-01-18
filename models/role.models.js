const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    Name: String,
})


module.exports = mongoose.model('Role', roleSchema)