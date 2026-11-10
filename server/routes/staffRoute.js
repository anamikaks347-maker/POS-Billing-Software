
const express = require('express')
const staffController = require('../controllers/staffController')
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware')

const route = express.Router()

// Staff Login - Public Route
route.post('/login-staff', staffController.loginStaff)

// Admin Protected Routes
route.post('/add-staff', adminAuthMiddleware, staffController.addStaff)

route.get('/list-staff', adminAuthMiddleware, staffController.listStaff)

route.put('/update-staff/:sid', adminAuthMiddleware, staffController.updateStaff)

route.delete('/delete-staff/:sid', adminAuthMiddleware, staffController.deleteStaff)

module.exports = route
