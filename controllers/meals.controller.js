const sequelize = require('../conexion')

const createMeals = async (req, res) =>{
    const {nombre_meal, precio, img} = req.body

    let arrayInsertAlbum = [`${nombre_meal}`, `${precio}`, `${img}`]

    try {
        const result = await sequelize.query('INSERT INTO meals (nombre_meal, precio, img) VALUES( ?, ?, ?)',
        {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({
            message: 'plato creado ',
            result
        })
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const getMeals = async (req, res) =>{
    try {
        const result = await sequelize.query('SELECT * FROM meals', {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la búsqueda ${error}`)
    }
}

const getMealsId = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT * FROM meals 
        WHERE id_meal = ${req.params.mealsId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la búsqueda ${error}`)
    } 
}

const updateMealsById = async (req, res) =>{
    const { nombre_meal, precio, img } = req.body

    try {
        const result = await sequelize.query(`UPDATE meals 
        SET nombre_meal = "${nombre_meal}",  
        precio = "${precio}", img = "${img}"  
        WHERE id_meal = ${req.params.mealsId}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(204).json({
            message: 'Plato actulizado',
            result
    })

    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const deleteMealsById = async (req, res) =>{
    try {
        const result = await sequelize.query(`DELETE FROM meals WHERE id_meal = ${req.params.mealsId}`)
        res.status(204).json({
            message: 'Plato eliminado',
            result
        })
    } catch (error) {
        console.log(`error en la eliminación ${error}`)
    }
}

exports.createMeals = createMeals
exports.getMeals = getMeals
exports.getMealsId = getMealsId
exports.updateMealsById = updateMealsById
exports.deleteMealsById = deleteMealsById