const sequelize = require('../conexion')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister
const validateLogin = require('../libs/validateInputs.libs').schemaLogin
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const singIn = async (req, res) =>{
    const { error } = validateLogin.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        try {
            let user = await sequelize.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, 
            {type: sequelize.QueryTypes.SELECT})

            console.log(user)
            user = user[0]

            if (!user) {
            return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
            }
            console.log(req.body.contrasena, user.contrasena)

            const validPassword = await bcrypt.compare(req.body.contrasena, user.contrasena, function(err, response) {
                if(err){
                    return response.status(400)
                }
                if (response) {
                    const token = jwt.sign({
                        nombre: user.nombre,
                        id_user: user.id_user,
                        id_role: user.id_role
                    }, process.env.TOKEN_SECRET, {
                        expiresIn: 86400
                    })
        
                res.header('Authorization', token).json({
                    error: null,
                    data: `Bienvenido ${user.name}`,
                    token
                })
                }else{
                    return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
                }
            }                
                )
          /*   
            if (!validPassword) {
            return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
            } */
        
           

    } catch (error) {
        res.status(400).json({
            error
        })
        console.log(error);
    }

   

}

        

const singUp = async (req, res) =>{
    const {nombre, email, phone, address, contraseña, id_role} = req.body

        const { error } = validateRegister.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(contraseña, salt)
       
        let arrayInsertAlbum = [`${nombre}`, `${email}`, `${phone}`, `${address}`, `${passwordHash}`, `${id_role}`]
       
        try {
            const result = await sequelize.query('INSERT INTO users (nombre, email, phone, address, contraseña, id_role) VALUES( ?, ?, ?, ?, ?, ?)',
            {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
            res.status(201).json({result})
        }catch (error) {
            console.log(`error en la inserción ${error}`)
            res.status(400).json({
                message : 'Usuario ya existe'
            })
        }

        //TODO: SequelizeUniqueConstraintError: Validation error   
}

exports.singIn = singIn
exports.singUp = singUp