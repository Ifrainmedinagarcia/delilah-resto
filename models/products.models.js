const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    Name: String,
    Category: String,
    Price: Number,
    ImgURL: String
})


module.exports = mongoose.model('Product', productSchema)