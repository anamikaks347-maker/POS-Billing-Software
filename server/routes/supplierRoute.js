
const express = require('express')
const supplierController = require('../controllers/supplierController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const route = express.Router()

route.post('/add-supplier', adminAuthMiddleware, supplierController.addSupplier)

route.get('/list-supplier', adminAuthMiddleware, supplierController.listSupplier)

route.put('/update-supplier/:sid', adminAuthMiddleware, supplierController.updateSupplier)

route.delete('/delete-supplier/:sid', adminAuthMiddleware, supplierController.deleteSupplier)

module.exports = route
