const sequelize = require('../conexion')
const bcrypt =require('bcrypt')

const createUser = async (req, res) =>{

    const {nombre, email, phone, address, contrasena, id_role} = req.body

    const { error } = validateRegister.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(contrasena, salt)
   
    let arrayInsertAlbum = [`${nombre}`, `${email}`, `${phone}`, `${address}`, `${passwordHash}`, `${id_role}`]
   
    try {
        const result = await sequelize.query('INSERT INTO users (nombre, email, phone, address, contrasena, id_role) VALUES( ?, ?, ?, ?, ?, ?)',
        {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({result})

        
    }catch (error) {
        console.log(`error en la inserción ${error}`)
        res.status(400).json({
            error,
            message : 'Usuario ya existe'
        })
    }

    //TODO: SequelizeUniqueConstraintError: Validation error   

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

const getUsersById = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT * FROM users 
        WHERE id_user = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})

        console.log(result)
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
    
}

const updateUsersById = async (req, res) =>{
    const {id_role} = req.body

    try {
        const result = await sequelize.query(`UPDATE users 
        SET id_role = ${id_role} WHERE id_user = ${req.params.userId}`,
        { type: sequelize.QueryTypes.UPDATE })
        console.log(result);
        res.status(204).json({
            message: 'user actulizado',
            result
    })

    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const deleteUserById = async (req, res) =>{
    try {
        const result = await sequelize.query(`DELETE FROM users WHERE id_user = ${req.params.userId}`)
        res.status(204).json({
            message: 'user eliminado',
            result
        })
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}


exports.createUser = createUser
exports.getUsers = getUsers
exports.getUsersById = getUsersById
exports.updateUsersById = updateUsersById
exports.deleteUserById = deleteUserById