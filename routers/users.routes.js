const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/users.controllers')
const verifyToken = require('../middleware/validate-token.middleware')


router.post('/', /* [verifyToken.verifyToken, verifyToken.isAdmin], */ userControllers.createUser)
router.get('/', userControllers.getUsers)

module.exports = router

