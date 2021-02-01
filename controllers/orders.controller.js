const sequelize = require('../conexion')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createOrder = async (req, res) =>{
    const {id_user, id_meal, forma_pago, id_status} = req.body

    let arrayInsertAlbum = [`${id_user}`, `${id_meal}`, `${forma_pago}`, `${id_status}`]

    try {
        const result = await sequelize.query('INSERT INTO orders (id_user, id_meal, forma_pago, id_status) VALUES( ?, ?, ?, ?)',
        {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({
            message: 'orden creada ',
            result
        })
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const getOrders = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT id_order, hora, m.nombre_meal, forma_pago, u.nombre_user, u.address, u.email, s.nombre_status 
        FROM orders left join users u using(id_user)
        left join meals m using(id_meal)
        left join status s using(id_status)`, {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result}) 
    } catch (error) {
        console.log(`error en la búsqueda ${error}`)
    }
}

const getOrderUsers = async (req, res) =>{
    const token = req.header('Authorization')
    const verify = jwt.verify(token, process.env.TOKEN_SECRET)
    console.log(verify);
    try {
        const result = await sequelize.query(`SELECT id_order, hora, m.nombre_meal, forma_pago, u.nombre_user, u.address, u.email, s.nombre_status 
        FROM orders 
        left join users u using(id_user)
        left join meals m using(id_meal)
        left join status s using(id_status) WHERE id_user = ${verify.id_user}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la búsqueda ${error}`)
    } 
}

const updateOrder = async (req, res) =>{
    const {id_status} = req.body
    try {
        const result = await sequelize.query(`UPDATE orders 
        SET id_status = "${id_status}" 
        WHERE id_order = ${req.params.orderId}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(204).json({
            message: 'orden actulizada',
            result
    })

    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const deleteOrder = async (req, res) =>{
    try {
        const result = await sequelize.query(`DELETE FROM orders WHERE id_order = ${req.params.orderId}`)
        res.status(204).json({
            message: 'orden eliminada',
            result
        })
    } catch (error) {
        console.log(`error en la eliminación ${error}`)
    }
}


exports.createOrder = createOrder
exports.getOrders = getOrders
exports.getOrderUsers = getOrderUsers
exports.updateOrder = updateOrder
exports.deleteOrder = deleteOrder