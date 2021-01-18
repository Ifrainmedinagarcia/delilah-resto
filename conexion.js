const mongoose = require('mongoose')
require('dotenv').config()

const URI = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.jltub.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

// connect to database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() =>{
    console.log(`Base de datos conectada`)
}).catch(e => console.log(e))

module.exports = mongoose;
