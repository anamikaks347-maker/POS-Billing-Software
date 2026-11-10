
const express = require('express')
const billController = require('../controllers/billController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const route = express.Router()

route.get('/test-bill', (req, res) => {
    res.status(200).json('Bill Route Working')
})

route.post('/add-bill', adminAuthMiddleware, billController.addBill)

route.get('/list-bill', adminAuthMiddleware, billController.listBills)

route.get('/get-bill/:bid', adminAuthMiddleware, billController.getBill)

module.exports = route
