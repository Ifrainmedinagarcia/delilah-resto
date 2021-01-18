const Role = require ('../models/role.models')

const createRoles = async ()=>{
    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return
    
        const values = await Promise.all([
            new Role({Name: 'user'}).save(),
            new Role({Name: 'admin'}).save()
        ])
    } catch (error) {
        console.error(error)
    }
}

exports.createRoles = createRoles