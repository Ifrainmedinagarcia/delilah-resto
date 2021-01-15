const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')
const PORT = 3000

//Routes 
//const auth = require('./routers/auth')
const meals = require('./routers/meals')
const orders = require('./routers/orders')


const app = express()
app.use(helmet())
app.use(cors())

// capturar body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.jltub.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('error db:', e))


//app.use('/api/auth', auth)
app.use('/api/meals', meals)
app.use('/api/orders', orders)


app.listen(PORT, () =>{
    console.log(`Server estarted in the PORT ${PORT}`);
})

exports.app = app