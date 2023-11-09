const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')
const router = express.Router()

router.post('/login', loginUser)   // login route
router.post('/signup', signupUser) // signup route

module.exports = router