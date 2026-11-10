const express = require('express')
const returnController = require('../controllers/returnController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const route = express.Router()

route.post('/add-return', adminAuthMiddleware, returnController.addReturn)

route.get('/list-return', adminAuthMiddleware, returnController.listReturns)

module.exports = route