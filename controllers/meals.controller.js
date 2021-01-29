const sequelize = require('../conexion')

const createMeals = async (req, res) =>{
    const {nombre, precio, imagen} = req.body

    let arrayInsertAlbum = [`${nombre}`, `${precio}`, `${imagen}`]

    try {
        const result = await sequelize.query('INSERT INTO meals (nombre, precio, imagen) VALUES( ?, ?, ?)',
        {replacements: arrayInsertAlbum , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({
            message: 'producto creado ',
            result
        })
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const getMeals = async (req, res) =>{
    try {
        const result = await sequelize.query('SELECT * FROM meals', {type: sequelize.QueryTypes.SELECT})
        console.log(result)
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

const getMealsId = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT * FROM meals 
        WHERE id_meal = ${req.params.mealsId}`, 
        {type: sequelize.QueryTypes.SELECT})

        console.log(result)
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
    
}

const updateMealsById = async (req, res) =>{
    const { nombre, precio, imagen } = req.body

    try {
        const result = await sequelize.query(`UPDATE meals 
        SET nombre = "${nombre}",  
        precio = "${precio}", imagen = "${imagen}"  
        WHERE id_meal = ${req.params.mealsId}`,
        { type: sequelize.QueryTypes.INSERT })
        console.log(result);
        res.status(204).json({
            message: 'album actulizado',
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
            message: 'album eliminado',
            result
        })
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

exports.createMeals = createMeals
exports.getMeals = getMeals
exports.getMealsId = getMealsId
exports.updateMealsById = updateMealsById
exports.deleteMealsById = deleteMealsById