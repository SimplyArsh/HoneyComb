const express = require('express')

// controller functions
const { 
    resetPasswordRequestController, 
    resetPasswordController, 
} = require('../controllers/auth-controller')

const router = express.Router()

router.post('/requestResetPassword', resetPasswordRequestController)   // login route
router.post('/resetPassword', resetPasswordController) // signup route

module.exports = router 