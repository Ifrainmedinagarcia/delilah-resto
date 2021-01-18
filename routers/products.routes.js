const controllerProducts = require('../controllers/products.controller')
const express = require('express')
const verifyToken = require('../middleware/validate-token.middleware')
const router = express.Router()

router.post('/', [verifyToken.verifyToken, verifyToken.isAdmin], controllerProducts.createProduct)

router.get('/', controllerProducts.getProduct)

router.get('/:productId', controllerProducts.getProductById)

router.put('/:productId', [verifyToken.verifyToken, verifyToken.isAdmin], controllerProducts.updateProductById)

router.delete('/:productId', [verifyToken.verifyToken, verifyToken.isAdmin], controllerProducts.deleteProductById)


module.exports = router