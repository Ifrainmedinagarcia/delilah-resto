const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const Roles = require('../models/role.models')
require('dotenv').config()

const verifyToken = async (req, res, next)=>{
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).json({error: 'Acceso denegado'})
    }
    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET)
        /* req.user = verify */
        console.log(verify);
        next()
    } catch (error) {
        res.status(400).json({error: 'token no válido'})
    }
}

const isAdmin = async (req, res, next) =>{
    const user = await User.findById(req.user.id)
    const roles = await Roles.find({_id: {$in: user.roles}})
    console.log(roles);
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].Name === 'admin') {
            next()
            console.log(roles[i].Name);
            return
        }
    }
    return res.status(403).json({message: 'Require admin role'})
}

exports.verifyToken = verifyToken
exports.isAdmin = isAdmin
