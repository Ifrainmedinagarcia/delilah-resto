const express = require('express')
const helmet = require('helmet')
const sequelize = require('./conexion')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 3000

//require Routes
const authRouter = require('./routers/auth.routes')
const mealsRouter = require('./routers/meals.routes')
const usersRouter = require('./routers/users.routes')

//Middleware
const app = express()
app.use(helmet())
app.use(cors())

// capture body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// route middlewares
app.use('/api/auth', authRouter)
app.use('/api/meals', mealsRouter)
app.use('/api/users', usersRouter)


app.listen(PORT, () =>{
    console.log(`Server estarted in the PORT ${PORT}`);
})


module.exports = app