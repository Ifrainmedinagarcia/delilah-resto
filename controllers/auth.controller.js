const User = require('../models/user.models')
const Roles = require('../models/role.models')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister
const validateLogin = require('../libs/validateInputs.libs').schemaLogin
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const singIn = async (req, res) =>{
    const { error } = validateLogin.validate(req.body)
        if (error) {
            return res.status(400).json({
                erro: error.details[0].message
            })
        }

        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).json({error: 'Usuario y/o contraseña inválida'})
        }
        
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET, {
            expiresIn: 86400
        })

        res.header('Authorization', token).json({
            error: null,
            data: `Bienvenido ${user.name}`,
            token
        })
}

const singUp = async (req, res) =>{
    const {name, email, password, roles} = req.body
        const { error } = validateRegister.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const isEmailExist = await User.findOne({email})
        if (isEmailExist) {
            return res.status(400).json({
                error: 'Email ya registrado'
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            name,
            email,
            password: passwordHash,
            roles
        })

        if (roles) {
            const foundRoles = await Roles.find({Name: {$in: roles}})
            user.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Roles.findOne({Name:'user'})
            user.roles = [role._id]
        }

        try {
            const saveUser = await user.save()
            res.status(200).json({
                error: null,
                data: saveUser
            })
        } catch (error) {
            res.status(400).json({ error })
        }
}

exports.singIn = singIn
exports.singUp = singUp