const express = require('express')

// controller functions
const { userSignup, userLogin } = require('../controllers/user-controller')
const router = express.Router()

router.post('/login', userLogin)   // login route
router.post('/signup', userSignup) // signup route

module.exports = router 