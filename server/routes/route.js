

const express = require('express')
const multerConfig =require('../middleware/multerMiddleware')
const productController = require('../controllers/productController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')
const route = express.Router()

// Add Product
route.post('/add-product',adminAuthMiddleware,multerConfig.single('photo'),productController.addProduct)
//List
route.get('/list-product',adminAuthMiddleware,productController.listProduct)
//Get Single Product
route.get('/get-product/:pid',adminAuthMiddleware,productController.getProduct)
//Delete Product
route.delete('/delete-product/:pid',adminAuthMiddleware,productController.deleteProduct)
//Update Product
route.put('/update-product/:pid',adminAuthMiddleware,multerConfig.single('photo'),productController.updateProduct)

module.exports=route