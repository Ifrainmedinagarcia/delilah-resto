const sequelize = require('../conexion')
const bcrypt = require('bcrypt')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister

const createUser = async (req, res) =>{

    const {nombre_user, email, phone, address, contrasena, id_role} = req.body

    const { error } = validateRegister.validate(req.body)
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(contrasena, salt)
   
    let arrayInsertAlbum = [`${nombre_user}`, `${email}`, `${phone}`, `${address}`, `${passwordHash}`, `${id_role}`]
   
    try {
        const result = await sequelize.query('INSERT INTO users (nombre_user, email, phone, address, contrasena, id_role) VALUES( ?, ?, ?, ?, ?, ?)',
        {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({result})

    }catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({
                error,
                message : 'Usuario ya existe'
            })
        } else {
            console.log(`error en la inserción ${error}`)
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
            
        }
    }

}

const getUsers = async (req, res) =>{
    try {
        const result = await sequelize.query('SELECT * FROM users', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            console.log(`error en la búsqueda ${error}`)
            res.status(404).json({
                error
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }
}

const getUsersById = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT * FROM users 
        WHERE id_user = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            console.log(`error en la búsqueda ${error}`)
            res.status(404).json({
                error
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }
    
}

const updateUsersById = async (req, res) =>{
    const {id_role} = req.body

    try {
        const result = await sequelize.query(`UPDATE users 
        SET id_role = ${id_role} WHERE id_user = ${req.params.userId}`,
        { type: sequelize.QueryTypes.UPDATE })
        res.status(204).json({
            message: 'user actulizado',
            result
    })

    } catch (error) {
        if (error.name) {
            console.log(`error en la actualización ${error}`)
            res.status(400).json({
                error
            })
        } else {
            res.status(500).json({
                error
            })
        }
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
        if (error.name) {
            console.log(`error en la eliminación ${error}`)
            res.status(400).json({
                error
            })
        } else {
            res.status(500).json({
                error
            })
        }
    }
}


exports.createUser = createUser
exports.getUsers = getUsers
exports.getUsersById = getUsersById
exports.updateUsersById = updateUsersById
exports.deleteUserById = deleteUserById

//export