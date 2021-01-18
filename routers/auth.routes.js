const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.models')
const validateRegister = require('../libs/validateInputs.libs').schemaRegister
const validateLogin = require('../libs/validateInputs.libs').schemaLogin


router.route('/login')
    .post(async (req, res)=>{
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
        }, process.env.TOKEN_SECRET)

        res.header('Authorization', token).json({
            error: null,
            data: 'Bienvenido',
            data: {token}
        })
})

router.route('/register')
    .post( async (req, res)=>{
        const {name, email, password, admin} = req.body
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
            admin
        })
        try {
            const saveUser = await user.save()
            res.status(200).json({
                error: null,
                data: saveUser
            })
        } catch (error) {
            res.status(400).json({ error })
        }
    })

module.exports = router

