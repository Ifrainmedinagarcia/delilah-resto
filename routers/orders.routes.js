const ordersController = require('../controllers/orders.controller')
const express = require('express')
const verifyToken = require('../middleware/validate-token.middleware')
const router = express.Router()


router.post('/', verifyToken.verifyToken, ordersController.createOrder)
router.get('/', verifyToken.verifyToken, ordersController.getOrder)
router.get('/:orderId', verifyToken.verifyToken, ordersController.getOrderById)
router.put('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin], ordersController.updateOrder)
router.delete('/:orderId', [verifyToken.verifyToken, verifyToken.isAdmin], ordersController.deleteOrder)