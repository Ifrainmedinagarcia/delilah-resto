const sequelize = require('../conexion')
const bcrypt =require('bcrypt')

const createUser = async (req, res) =>{

    const {nombre, email, phone, address, contraseña, id_role} = req.body

 /*    const isEmailExist = await sequelize.query(`SELECT email FROM users WHERE email = ${email}`)
    if (isEmailExist) {
        return res.status(400).json({
            error: 'Email ya registrado'
        })
    } */

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
    }

}

const getUsers = async (req, res) =>{
    try {
        const result = await sequelize.query('SELECT * FROM users', {type: sequelize.QueryTypes.SELECT})
        console.log(result)
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

exports.createUser = createUser
exports.getUsers = getUsers