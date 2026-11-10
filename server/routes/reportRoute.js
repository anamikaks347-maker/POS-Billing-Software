const express = require('express')
const reportController = require('../controllers/reportController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const route = express.Router()

route.get('/reports', adminAuthMiddleware, reportController.getReports)

module.exports = route