const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const PORT = 3000

//require Routes
const authRouter = require('./routers/authRouter')
const verifyToken = require('./middleware/validate-token')
const admin = require('./routers/admin')
const URI = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.jltub.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

//Middleware
const app = express()
app.use(helmet())
app.use(cors())

// capture body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect to database
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log(`Base de datos conectada`)
}).catch(e => console.log(e))

// route middlewares
app.use('/auth', authRouter)
app.use('/admin', verifyToken, admin)


app.listen(PORT, () =>{
    console.log(`Server estarted in the PORT ${PORT}`);
})


module.exports = app