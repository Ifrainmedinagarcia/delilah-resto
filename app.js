const express = require('express')
const helmet = require('helmet')
const mongoose = require('./conexion')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000
const createRoles = require('./libs/initialSetup.libs').createRoles

//require Routes
const authRouter = require('./routers/auth.routes')
const productsRouter = require('./routers/products.routes')
const usersRouter = require('./routers/user.routes')

//Middleware
const app = express()
app.use(helmet())
app.use(cors())
createRoles()

// capture body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// route middlewares
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)


app.listen(PORT, () =>{
    console.log(`Server estarted in the PORT ${PORT}`);
})


module.exports = app