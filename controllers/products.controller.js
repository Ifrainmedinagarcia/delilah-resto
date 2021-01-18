const modelProduct = require('../models/products.models')

const createProduct = async (req, res) =>{
    const {Name, Category, Price, ImgURL} = req.body
    const NewProduct = new modelProduct({
        Name,
        Category,
        Price,
        ImgURL
    })

    const productSave = await NewProduct.save()

    res.status(201).json({productSave})
}

const getProduct = async (req, res) =>{
    const products = await modelProduct.find()
    res.status(200).json({products})
}

const getProductById = async (req, res) =>{
    const product = await modelProduct.findById(req.params.productId)
    res.status(200).json({product})
}

const updateProductById = async (req, res) =>{
    const updatedProduct = await modelProduct.findByIdAndUpdate(req.params.productId, req.body,{
        new: true
    })
    res.status(204).json({updatedProduct})
}

const deleteProductById = async (req, res) =>{
    const deleteProduct = await modelProduct.findByIdAndDelete(req.params.productId)
    res.status(204).json({
        message: 'Deleted Product'
    })
}

exports.createProduct = createProduct
exports.getProduct = getProduct
exports.getProductById = getProductById
exports.updateProductById = updateProductById
exports.deleteProductById = deleteProductById